// routes/bookingRoutes.js
import express from "express";
import { createBooking, getMyBookings, getAllBookings, markPaid, getActiveBookings } from "../controllers/bookingController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/active", getActiveBookings);        // public
router.post("/", authMiddleware, createBooking);
router.get("/me", authMiddleware, getMyBookings);
router.get("/all", authMiddleware, getAllBookings);
router.patch("/:id/pay", authMiddleware, markPaid);

export default router;
