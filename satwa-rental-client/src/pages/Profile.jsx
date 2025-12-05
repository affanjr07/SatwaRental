import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*, vehicles(*)") // JOIN ke tabel kendaraan
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      setBookings(data);
    }

    setLoading(false);
  }

  if (!user) return <p className="text-center mt-10">Silakan login dulu...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-20">
      {/* User Info */}
      <h1 className="text-3xl font-bold mb-4">Profil Saya</h1>

      <div className="bg-white rounded-xl shadow p-5 mb-8">
        <h2 className="text-xl font-semibold mb-3">Informasi Pengguna</h2>

        <p><strong>Nama:</strong> {user.user_metadata.full_name || "Tidak ada"}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>

      {/* Booking History */}
      <h2 className="text-2xl font-bold mb-4">Riwayat Pemesanan</h2>

      {loading ? (
        <p className="text-center text-gray-500">Memuat riwayat...</p>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500">Belum ada riwayat pemesanan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bookings.map((b) => (
            <div key={b.id} className="bg-white rounded-xl shadow p-4 flex gap-4">

              {/* Vehicle Image */}
              <img
                src={b.vehicles.image_url}
                alt={b.vehicles.name}
                className="w-32 h-24 object-cover rounded-md"
              />

              {/* Text */}
              <div>
                <h3 className="text-lg font-semibold">{b.vehicles.name}</h3>

                <p className="text-sm text-gray-600">
                  Tanggal: {b.start_date} — {b.end_date}
                </p>

                <p className="text-sm text-gray-600">
                  Total Harga: <strong>Rp {b.total_price.toLocaleString()}</strong>
                </p>

                <p className="mt-2">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      b.status === "confirmed"
                        ? "bg-green-600"
                        : b.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
