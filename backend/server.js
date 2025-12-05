import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

const app = express();

// CORS fix (IMPORTANT)
app.use(
  cors({
    origin: ["https://satwa-rental.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Handle OPTIONS manually (Vercel needs this!)
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Required by Vercel
export default function handler(req, res) {
  app(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
