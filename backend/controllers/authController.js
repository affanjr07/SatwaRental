import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js";

// =====================
// REGISTER USER
// =====================
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Cek jika email sudah ada
    const exist = await findUserByEmail(email);
    if (exist) return res.status(400).json({ msg: "Email sudah terdaftar" });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Simpan user ke database
    await createUser(username, email, hashed);

    res.json({ msg: "Register berhasil" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// =====================
// LOGIN USER / ADMIN
// =====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // -------- LOGIN ADMIN (static) --------
    if (email === "admin@mail.com" && password === "admin123") {
      const token = jwt.sign(
        { id: 0, email, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        msg: "Login admin berhasil",
        token,
        user: { id: 0, username: "Admin", email, role: "admin" },
      });
    }

    // -------- LOGIN USER --------
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login berhasil",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: "user",
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
