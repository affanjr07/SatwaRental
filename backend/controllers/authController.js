import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exist = await findUserByEmail(email);
    if (exist) return res.status(400).json({ msg: "Email sudah terdaftar" });

    const hashed = await bcrypt.hash(password, 10);

    await createUser(username, email, hashed);

    res.json({ msg: "Register berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ADMIN LOGIN (tanpa database)
    if (email === "admin@mail.com" && password === "admin123") {
      return res.json({
        msg: "Login admin berhasil",
        user: {
          id: "admin",
          username: "Admin",
          email: "admin@mail.com",
          role: "admin",
        },
        token: "ADMIN_TOKEN",
      });
    }

    // LOGIN USER REGULER
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ msg: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login berhasil",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: "user",
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
