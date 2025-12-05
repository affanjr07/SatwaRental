import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: ["https://satwa-rental.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ---- ROUTES ----
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

// IMPORTANT: Hapus app.listen()!
// Vercel tidak menggunakan server.listen
// Kamu harus export default handler

export default app;
