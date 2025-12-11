// controllers/bookingController.js
import supabase from "../config/supabase.js";

/**
 * generate booking code like BK-YYYYMMDD-XXXX
 */
function genBookingCode() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  return `BK-${y}${m}${day}-${random}`;
}

export const createBooking = async (req, res) => {
  try {
    // req.user set by your authMiddleware (decoded jwt => must include id and role)
    const user_id = Number(req.user?.id);
    if (!user_id) return res.status(401).json({ msg: "Unauthorized" });

    const { vehicle_id, start_date, end_date, total_price, pickup_location, dropoff_location } = req.body;
    if (!vehicle_id || !start_date || !end_date || !total_price) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const booking_code = genBookingCode();

    const { data, error } = await supabase
      .from("bookings")
      .insert([{
        user_id,
        vehicle_id,
        booking_code,
        start_date,
        end_date,
        total_price,
        pickup_location: pickup_location || null,
        dropoff_location: dropoff_location || null,
        payment_method: null,
        payment_status: "pending",
        booking_status: "booked"
      }])
      .select()
      .single();

    if (error) return res.status(400).json({ msg: error.message });

    return res.status(201).json({ msg: "Booking created", booking: data });
  } catch (err) {
    console.error("createBooking:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const user_id = Number(req.user?.id);
    if (!user_id) return res.status(401).json({ msg: "Unauthorized" });

    const { data, error } = await supabase
      .from("bookings")
      .select("*, vehicles(*)")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ msg: error.message });
    return res.json(data);
  } catch (err) {
    console.error("getMyBookings:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    // require admin
    if (req.user?.role !== "admin") return res.status(403).json({ msg: "Forbidden" });

    const { data, error } = await supabase
      .from("bookings")
      .select("*, users(username,email), vehicles(*)")
      .order("created_at", { ascending: false });

    if (error) return res.status(400).json({ msg: error.message });
    return res.json(data);
  } catch (err) {
    console.error("getAllBookings:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};

/**
 * Mark booking as paid (simulation) or update payment status.
 * Body: { payment_method?: string, set_status_to?: 'paid'|'pending'|'failed' }
 */
export const markPaid = async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_method = "manual", set_status_to = "paid" } = req.body;

    // fetch booking owner
    const bookingQ = await supabase.from("bookings").select("user_id").eq("id", id).single();
    if (bookingQ.error) return res.status(404).json({ msg: bookingQ.error.message });

    const isOwner = String(bookingQ.data.user_id) === String(req.user?.id);
    const isAdmin = req.user?.role === "admin";
    if (!isOwner && !isAdmin) return res.status(403).json({ msg: "Forbidden" });

    const updates = {
      payment_status: set_status_to,
      payment_method,
      // only set booking_status to 'active' or keep booked; choose simple logic:
      booking_status: set_status_to === "paid" ? "booked" : "booked",
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from("bookings")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) return res.status(400).json({ msg: error.message });

    return res.json({ msg: "Booking updated", booking: data });
  } catch (err) {
    console.error("markPaid:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
export const getActiveBookings = async (req, res) => {
  try {
    // ambil booking yang sedang 'booked' atau 'active'
    const { data, error } = await supabase
      .from("bookings")
      .select("id, booking_code, start_date, end_date, total_price, booking_status, vehicles(id,name,image_url), users(username)")
      .in("booking_status", ["booked", "active"])
      .order("start_date", { ascending: true })
      .limit(20);

    if (error) return res.status(400).json({ msg: error.message });
    // kembalikan minimal fields (aman untuk publik)
    const publicData = data.map((r) => ({
      id: r.id,
      booking_code: r.booking_code,
      start_date: r.start_date,
      end_date: r.end_date,
      booking_status: r.booking_status,
      vehicle: r.vehicles ? { id: r.vehicles.id, name: r.vehicles.name, image_url: r.vehicles.image_url } : null,
      renter: r.users?.username ? { username: r.users.username } : null
    }));
    return res.json(publicData);
  } catch (err) {
    console.error("getActiveBookings:", err);
    return res.status(500).json({ msg: "Server error" });
  }
};
