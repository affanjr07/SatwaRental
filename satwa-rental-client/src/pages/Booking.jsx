import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Booking() {
  const { id } = useParams(); // ambil ID dari URL

  const [vehicles, setVehicles] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [totalHarga, setTotalHarga] = useState("");
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL;

  // ==========================
  // FETCH KENDARAAN
  // ==========================
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/vehicles`);
        const data = await res.json();

        console.log("Fetch vehicles response:", data);

        setVehicles(data);

        // Auto pilih kendaraan dari URL
        if (id) {
          setSelectedId(String(id));  // FIX: convert ke string
        } else {
          // Jika datang dari button BOOK tanpa id
          const saved = localStorage.getItem("selected_vehicle");
          if (saved) {
            const parsed = JSON.parse(saved);
            setSelectedId(String(parsed.id)); // FIX
          }
        }
      } catch (err) {
        console.error("Error fetch vehicles:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // ==========================
  // HITUNG TOTAL HARGA
  // ==========================
  useEffect(() => {
    const kendaraan = vehicles.find((v) => String(v.id) === String(selectedId));
    if (!kendaraan || !tanggalMulai || !tanggalSelesai) return;

    const mulai = new Date(tanggalMulai);
    const selesai = new Date(tanggalSelesai);

    const hari = Math.ceil((selesai - mulai) / (1000 * 3600 * 24));

    if (hari > 0) {
      setTotalHarga((kendaraan.price_per_day * hari).toLocaleString());
    } else {
      setTotalHarga("");
    }
  }, [selectedId, tanggalMulai, tanggalSelesai, vehicles]);

  // ==========================
  // SUBMIT BOOKING (SIMULASI)
  // ==========================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedId || !tanggalMulai || !tanggalSelesai || !totalHarga) {
      alert("Lengkapi semua data!");
      return;
    }

    const bookingData = {
      vehicle_id: selectedId,
      tanggal_mulai: tanggalMulai,
      tanggal_selesai: tanggalSelesai,
      total_harga: totalHarga.replace(/\./g, "")
    };

    console.log("Booking:", bookingData);
    alert("Booking berhasil! (Simulasi)");

    localStorage.removeItem("selected_vehicle");
    window.location.href = "/";
  };

  // ==========================
  // LOADING STATE
  // ==========================
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Memuat data kendaraan...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Form Pemesanan Kendaraan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PILIH KENDARAAN */}
          <div>
            <label className="block mb-1">Pilih Kendaraan</label>
            <select
              className="w-full border px-4 py-2 rounded"
              required
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Pilih Kendaraan --</option>
              {vehicles.map((v) => (
                <option key={v.id} value={String(v.id)}>
                  {v.name} - Rp {v.price_per_day.toLocaleString()}/hari
                </option>
              ))}
            </select>
          </div>

          {/* TANGGAL */}
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

          {/* TOTAL HARGA */}
          <div>
            <label className="block mb-1">Total Harga</label>
            <input
              type="text"
              readOnly
              className="w-full border px-4 py-2 bg-gray-100 rounded"
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
