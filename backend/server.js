import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";



const app = express();

// FULL CORS FIX for Vercel
const corsOptions = {
    origin: ["https://satwa-rental.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

// CORS dulu (WAJIB)
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// === ROUTES ===
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

// === FIX UNTUK VERCEL ===
export default function handler(req, res) {
  return app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
