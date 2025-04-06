import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
type Role = "ADMIN" | "USER"; // Define Role type manually based on your application's roles

declare module "express" {
  export interface Request {
    user?: { id: string; role: Role };
  }
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// ✅ User Registration
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, phone, state, district, village, pincode, password, role } = req.body;
  
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) return next(new ApiError(400, "User already exists"));
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: { name, email, phone, state, district, village, pincode, password: hashedPassword, role },
      });
  
      res.status(201).json(new ApiResponse(201, "User registered successfully", user));
    } catch (error) {
      next(error);
    }
  };
  

// ✅ User Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return next(new ApiError(404, "User not found"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError(401, "Invalid credentials"));

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    res.status(200).json(new ApiResponse(200, "Login successful", { token, user }));
  } catch (error) {
    next(error);
  }
};

// ✅ Get Profile (Protected)
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!user) return next(new ApiError(404, "User not found"));

    res.status(200).json(new ApiResponse(200, "User profile fetched", user));
  } catch (error) {
    next(error);
  }
};

// ✅ User Logout
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token");
    res.status(200).json(new ApiResponse(200, "Logged out successfully"));
  } catch (error) {
    next(error);
  }
};
