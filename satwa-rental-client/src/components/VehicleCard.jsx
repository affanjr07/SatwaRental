import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VehicleCard({ v }) {
  const { user } = useAuth();
  const nav = useNavigate();
  const [message, setMessage] = useState("");

  const handleBook = () => {
    setMessage("");

    if (!user) {
      setMessage("Silakan login terlebih dahulu untuk menyewa kendaraan!");
      setTimeout(() => nav("/login"), 1000);
      return;
    }

    if (!v.id) {
      alert("Kendaraan tidak memiliki ID! Periksa database Supabase.");
      return;
    }

    // Simpan sementara
    localStorage.setItem("selected_vehicle", JSON.stringify(v));

    // Redirect yang benar
    nav(`/booking/${v.id}`);
  };

  const price = v.harga ?? v.price_per_day ?? v.pricePerDay ?? 0;
  const nama = v.nama ?? v.name ?? "Unknown";
  const jenis = v.jenis ?? v.type ?? "-";
  const gambar = v.gambar ?? v.image_url ?? "";
  const spesifikasi = Array.isArray(v.spesifikasi) ? v.spesifikasi : [];

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img src={gambar} alt={nama} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h4 className="text-lg font-semibold">{nama}</h4>
        <p className="text-sm text-gray-500 mb-2">{jenis}</p>
        <p className="text-blue-600 font-bold mb-3">
          Rp {Number(price).toLocaleString()}/hari
        </p>

        {spesifikasi.length > 0 && (
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            {spesifikasi.map((item, index) => (
              <li key={index} className="flex items-start gap-1">
                <span>🔹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {message && <p className="text-red-600 text-sm mb-2">{message}</p>}

        <button
          onClick={handleBook}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sewa Sekarang
        </button>
      </div>
    </div>
  );
}
