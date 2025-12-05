import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

export default function Profile() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`${API}/api/bookings/me`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setBookings(data);
    };

    load();
  }, []);

  return (
    <div className="pt-24 px-8">
      <h1 className="text-3xl font-bold mb-6">Profil Saya</h1>

      <div className="mb-10 p-5 bg-white shadow rounded-lg">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <h2 className="text-2xl font-bold mb-4">Riwayat Pemesanan</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">Belum ada riwayat pemesanan.</p>
      ) : (
        <div className="space-y-5">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="p-5 bg-white rounded-lg shadow flex gap-5"
            >
              <img
                src={b.vehicles.image_url}
                className="w-40 rounded-lg object-cover"
              />

              <div>
                <h3 className="text-xl font-bold">{b.vehicles.name}</h3>
                <p className="text-gray-600">{b.vehicles.type}</p>
                <p className="mt-2 text-blue-600 font-semibold">
                  Total: Rp {b.total_price.toLocaleString()}
                </p>
                <p className="text-sm mt-1">
                  {b.start_date} → {b.end_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
