import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const { error } = await supabase.from("users").insert([
    { username, email, password: hashed, role: "user" }
  ]);

  if (error) return res.status(400).json({ msg: error.message });

  return res.json({ msg: "Registered successfully" });
}

export async function login(req, res) {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user)
    return res.status(400).json({ msg: "Invalid email or password" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid email or password" });

  // 🔥 TOKEN SEKARANG MEMBAWA ROLE
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  delete user.password;

  return res.json({ msg: "Login success", user, token });
}
