import supabase from "../config/supabase.js";

export async function createBooking(req, res) {
  const { vehicle_id, start_date, end_date, total_price } = req.body;

  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        user_id: req.user.id,
        vehicle_id,
        start_date,
        end_date,
        total_price,
      },
    ])
    .select();

  if (error) return res.status(500).json({ msg: error.message });

  res.json({ msg: "Booking created", data });
}

export async function getMyBookings(req, res) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, vehicles(*)")
    .eq("user_id", req.user.id);

  if (error) return res.status(500).json({ msg: error.message });

  res.json(data);
}
