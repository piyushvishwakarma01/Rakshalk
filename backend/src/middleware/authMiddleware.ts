import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  // Add other roles as needed
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

interface DecodedToken {
  id: string;
  role: Role; 
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // Read token from cookie

  if (!token) return next(new ApiError(401, "Unauthorized: No token provided"));

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return next(new ApiError(403, "Forbidden: Invalid token"));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ApiError(401, "Unauthorized: No token provided"));
  }

  if (req.user.role !== Role.ADMIN) {
    return next(new ApiError(403, "Forbidden: You do not have admin privileges"));
  }

  next(); // User is admin, proceed to the next middleware or controller
};
