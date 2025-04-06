import { Request, Response, NextFunction } from "express";
import { prisma } from "../utils/prisma";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

// ✅ Get All Users (Admin Only)
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true },
  });

  res.status(200).json(new ApiResponse(200, "All users fetched", users));
};

// ✅ Get Single User (Admin or Self)
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) return next(new ApiError(404, "User not found"));

  res.status(200).json(new ApiResponse(200, "User fetched", user));
};

// ✅ Update User (Only Self or Admin)
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, phone, state,district,pincode, village } = req.body;

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { name, phone, state,district,pincode, village },
  });

  res.status(200).json(new ApiResponse(200, "User updated successfully", updatedUser));
};

// ✅ Delete User (Admin Only)
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  await prisma.user.delete({ where: { id } });

  res.status(200).json(new ApiResponse(200, "User deleted successfully"));
};
