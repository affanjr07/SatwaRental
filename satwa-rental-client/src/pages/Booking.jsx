import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Booking() {
  const { id } = useParams(); // <--- ID dari URL
  const [vehicle, setVehicle] = useState(null);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [totalHarga, setTotalHarga] = useState("");

  useEffect(() => {
    const loadVehicle = async () => {
      const API = import.meta.env.VITE_API_URL;

      const res = await fetch(`${API}/api/vehicles/${id}`);
      const data = await res.json();
      setVehicle(data);
    };

    loadVehicle();
  }, [id]);

  useEffect(() => {
    if (!vehicle || !tanggalMulai || !tanggalSelesai) return;

    const mulai = new Date(tanggalMulai);
    const selesai = new Date(tanggalSelesai);
    const hari = Math.ceil((selesai - mulai) / (1000 * 3600 * 24));

    if (hari > 0) {
      setTotalHarga((vehicle.price_per_day * hari).toLocaleString());
    } else {
      setTotalHarga("");
    }
  }, [tanggalMulai, tanggalSelesai, vehicle]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tanggalMulai || !tanggalSelesai || !totalHarga) {
      alert("Lengkapi semua data!");
      return;
    }

    const bookingData = {
      vehicle_id: id,
      tanggal_mulai: tanggalMulai,
      tanggal_selesai: tanggalSelesai,
      total_harga: totalHarga.replace(/\./g, ""),
    };

    console.log("Booking:", bookingData);
    alert("Booking berhasil (simulasi).");
    window.location.href = "/";
  };

  if (!vehicle) return <div className="p-10 text-center">Memuat...</div>;

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Form Pemesanan Kendaraan
        </h2>

        <div className="mb-4 p-4 bg-blue-100 rounded-lg">
          <h3 className="text-xl font-semibold">{vehicle.name}</h3>
          <p>Harga per hari: Rp {vehicle.price_per_day.toLocaleString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Tanggal Mulai</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded"
                required
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">Tanggal Selesai</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded"
                required
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">Total Harga</label>
            <input
              type="text"
              className="w-full border px-4 py-2 bg-gray-100 rounded"
              readOnly
              value={totalHarga}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Konfirmasi Booking
          </button>
        </form>
      </main>
    </div>
  );
}
