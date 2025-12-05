import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VehicleCard({ v }) {
  const { user } = useAuth();
  const nav = useNavigate();
  const [message, setMessage] = useState("");

  const handleBook = () => {
    if (!user) {
      setMessage("Silakan login terlebih dahulu!");
      setTimeout(() => nav("/login"), 900);
      return;
    }

    localStorage.setItem("selected_vehicle", JSON.stringify(v));
    nav(`/booking/${v.id}`);
  };

  const price = v.price_per_day ?? v.harga ?? 0;
  const nama = v.name ?? v.nama ?? "Unknown";
  const jenis = v.type ?? v.jenis ?? "-";
  const gambar = v.image_url ?? v.gambar ?? "";
  const spesifikasi = v.spesifikasi || []; // <-- spesifikasi array

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <img src={gambar} className="w-full h-56 object-cover" />

      <div className="p-5">
        <h4 className="text-xl font-semibold">{nama}</h4>
        <p className="text-gray-500 text-sm mb-2">{jenis}</p>

        <p className="text-blue-600 font-bold mb-4 text-lg">
          Rp {Number(price).toLocaleString()}/hari
        </p>

        {spesifikasi.length > 0 && (
          <ul className="mb-4 text-sm text-gray-600 space-y-1">
            {spesifikasi.map((sp, i) => (
              <li key={i} className="flex gap-2">
                <span>•</span>
                <span>{sp}</span>
              </li>
            ))}
          </ul>
        )}

        {message && <p className="text-red-500 text-sm mb-2">{message}</p>}

        <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Sewa Sekarang
        </button>
      </div>
    </div>
  );
}
