import express from "express";
import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";

import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getVehicles);
router.get("/:id", getVehicleById);

// Admin routes
router.post("/", authMiddleware, adminOnly, createVehicle);
router.put("/:id", authMiddleware, adminOnly, updateVehicle);
router.delete("/:id", authMiddleware, adminOnly, deleteVehicle);

export default router;
