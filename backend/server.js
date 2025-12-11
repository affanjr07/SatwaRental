import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

// FULL CORS FIX (update: include PATCH & common headers)
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://satwa-rental.vercel.app",
    // add other origins if needed
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
  credentials: true,
};

// apply cors middleware
app.use(cors(corsOptions));

// handle preflight for all routes (safety)
app.options("/*", cors(corsOptions));


app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);

// Vercel Handler
export default function handler(req, res) {
  return app(req, res);
}
// Only run local server if not on Vercel
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Local API running at http://localhost:${PORT}`));
}


export const config = {
  api: {
    bodyParser: false,
  },
};
