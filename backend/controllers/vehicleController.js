import supabase from "../config/supabase.js";

export async function getVehicles(req, res) {
  const { data, error } = await supabase.from("vehicles").select("*");
  if (error) return res.status(500).json({ msg: error.message });
  res.json(data);
}

export async function getVehicleById(req, res) {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ msg: "Vehicle not found" });
  res.json(data);
}

export async function createVehicle(req, res) {
  const { name, type, price_per_day, image_url } = req.body;

  const { data, error } = await supabase
    .from("vehicles")
    .insert([{ name, type, price_per_day, image_url }])
    .select();

  if (error) return res.status(500).json({ msg: error.message });

  res.json({ msg: "Vehicle created", data });
}

export async function updateVehicle(req, res) {
  const { id } = req.params;
  const { name, type, price_per_day, image_url } = req.body;

  const { error } = await supabase
    .from("vehicles")
    .update({ name, type, price_per_day, image_url })
    .eq("id", id);

  if (error) return res.status(500).json({ msg: error.message });

  res.json({ msg: "Vehicle updated" });
}

export async function deleteVehicle(req, res) {
  const { id } = req.params;
  const { error } = await supabase.from("vehicles").delete().eq("id", id);
  if (error) return res.status(500).json({ msg: error.message });
  res.json({ msg: "Vehicle deleted" });
}
