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
      setTimeout(() => nav("/login"), 800);
      return;
    }

    if (!v.id) {
      alert("Kendaraan tidak memiliki ID! Periksa database Supabase.");
      return;
    }

    // simpan sementara
    localStorage.setItem("selected_vehicle", JSON.stringify(v));

    // arahkan ke booking
    nav(`/booking/${v.id}`);
  };

  // Fix data agar kompatibel dengan semua format Supabase/API
  const nama = v.nama ?? v.name ?? "Tanpa Nama";
  const jenis = v.jenis ?? v.type ?? "Tidak diketahui";
  const harga = v.harga ?? v.price_per_day ?? v.pricePerDay ?? 0;
  const gambar = v.gambar ?? v.image_url ?? v.image ?? "";
  const spesifikasi = Array.isArray(v.spesifikasi ?? v.specification ?? [])
    ? (v.spesifikasi || v.specification)
    : [];

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      
      {/* Gambar kendaraan */}
      <img
        src={gambar}
        alt={nama}
        className="w-full h-48 object-cover bg-gray-200"
      />

      <div className="p-4">
        {/* Nama & jenis */}
        <h4 className="text-lg font-semibold">{nama}</h4>
        <p className="text-sm text-gray-500 mb-2">{jenis}</p>

        {/* Harga */}
        <p className="text-blue-600 font-bold mb-3">
          Rp {Number(harga).toLocaleString()}/hari
        </p>

        {/* Spesifikasi */}
        {spesifikasi.length > 0 && (
          <ul className="text-sm text-gray-700 mb-4 space-y-1">
            {spesifikasi.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-blue-500">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Pesan error (belum login) */}
        {message && <p className="text-red-600 text-sm mb-3">{message}</p>}

        {/* Tombol sewa */}
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
