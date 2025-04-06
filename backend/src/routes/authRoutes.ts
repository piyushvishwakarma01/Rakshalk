import express from "express";
import { register, login, getProfile, logout } from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Routes
router.get("/profile", authenticate, getProfile);
router.post("/logout", authenticate, logout);

export default router;
