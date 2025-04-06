import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userController";
import { authenticate, isAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticate, isAdmin, getAllUsers); // Admin Only
router.get("/:id", authenticate, getUserById); // User or Admin
router.put("/:id", authenticate, updateUser); // User or Admin
router.delete("/:id", authenticate, isAdmin, deleteUser); // Admin Only

export default router;
