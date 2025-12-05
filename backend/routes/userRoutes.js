import express from "express";
import { getUsers } from "../controllers/userController.js";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Hanya admin bisa akses daftar user
router.get("/", authMiddleware, adminOnly, getUsers);

export default router;
