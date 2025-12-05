import express from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "https://satwa-rental.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json());

// ROUTES
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

// ❗ Tambahkan ini supaya Express bisa jalan di Vercel
export default app;
