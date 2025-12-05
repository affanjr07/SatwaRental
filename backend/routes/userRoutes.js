import express from "express";
import supabase from "../config/supabase.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, email, role");

  if (error) return res.status(400).json({ msg: error.message });

  return res.json(data);
});

export default router;
