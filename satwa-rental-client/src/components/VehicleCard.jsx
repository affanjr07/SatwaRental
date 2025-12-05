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

    if (!v.id) {
      alert("Kendaraan tidak memiliki ID di database!");
      return;
    }

    localStorage.setItem("selected_vehicle", JSON.stringify(v));
    nav(`/booking/${v.id}`);
  };

  const nama = v.nama ?? v.name ?? "Unknown";
  const jenis = v.jenis ?? v.type ?? "-";
  const price = v.harga ?? v.price_per_day ?? 0;
  const gambar = v.gambar ?? v.image_url ?? "";
  const spesifikasi = Array.isArray(v.spesifikasi)
    ? v.spesifikasi
    : Array.isArray(v.specification)
    ? v.specification
    : [];

  return (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-2xl border hover:border-blue-500/40 transition-all duration-300">
      <div className="relative">
        <img
          src={gambar}
          alt={nama}
          className="w-full h-52 object-cover bg-gray-200"
        />

        {/* Badge tipe */}
        <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-sm rounded-lg shadow">
          {jenis}
        </span>
      </div>

      <div className="p-5">
        <h4 className="text-xl font-bold">{nama}</h4>

        <p className="text-blue-600 font-bold text-lg mt-2">
          Rp {Number(price).toLocaleString()}/hari
        </p>

        {spesifikasi.length > 0 && (
          <ul className="mt-3 mb-4 text-sm text-gray-600 space-y-1">
            {spesifikasi.slice(0, 4).map((sp, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-500">•</span>
                <span>{sp}</span>
              </li>
            ))}

            {spesifikasi.length > 4 && (
              <li className="text-blue-600 text-sm">+ {spesifikasi.length - 4} lainnya...</li>
            )}
          </ul>
        )}

        {message && <p className="text-red-500 text-sm mb-2">{message}</p>}

        {/* Button */}
        <button
          onClick={handleBook}
          className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium hover:bg-blue-700 transition"
        >
          Sewa Sekarang
        </button>
      </div>
    </div>
  );
}
