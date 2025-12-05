import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings
} from "../controllers/bookingController.js";

const router = express.Router();

// create booking
router.post("/", authMiddleware, createBooking);

// get booking history
router.get("/me", authMiddleware, getMyBookings);

export default router;
