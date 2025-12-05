import supabase from "../config/supabase.js";

export async function getUsers(req, res) {
  const { data, error } = await supabase
    .from("users")
    .select("id, username, email, role");

  if (error) {
    return res.status(500).json({ msg: error.message });
  }

  return res.json(data);
}
