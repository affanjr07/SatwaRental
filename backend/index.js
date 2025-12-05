import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: "https://satwa-rental.vercel.app",  
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// ---- SEMUA ROUTE DI BAWAH INI ----
import authRoutes from "./routes/authRoutes.js";
import vehicleRoutes from "./routes/vehicleRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);

app.listen(5000, () => console.log("Server berjalan"));
