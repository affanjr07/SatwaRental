import React, { useState, useEffect } from "react";

export default function Booking() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [totalHarga, setTotalHarga] = useState("");

  // ===== AMBIL DATA KENDARAAN DARI LOCALSTORAGE =====
  useEffect(() => {
    const stored = localStorage.getItem("satwa_vehicles");
    if (stored) {
      const data = JSON.parse(stored);
      setVehicles(data);
    }

    // Jika user klik "BOOK" di VehicleCard
    const selected = localStorage.getItem("selected_vehicle");
    if (selected) {
      const parsed = JSON.parse(selected);
      setSelectedId(parsed.id); // otomatis memilih kendaraan
    }
  }, []);

  // ===== HITUNG TOTAL HARGA OTOMATIS =====
  useEffect(() => {
    const kendaraan = vehicles.find((v) => v.id == selectedId);
    if (!kendaraan || !tanggalMulai || !tanggalSelesai) return;

    const mulai = new Date(tanggalMulai);
    const selesai = new Date(tanggalSelesai);
    const hari = Math.ceil((selesai - mulai) / (1000 * 3600 * 24));

    if (hari > 0) {
      setTotalHarga((kendaraan.harga * hari).toLocaleString());
    } else {
      setTotalHarga("");
    }
  }, [selectedId, tanggalMulai, tanggalSelesai, vehicles]);

  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId || !tanggalMulai || !tanggalSelesai || !totalHarga) {
      alert("Lengkapi semua data terlebih dahulu!");
      return;
    }

    const bookingData = {
      vehicle_id: selectedId,
      tanggal_mulai: tanggalMulai,
      tanggal_selesai: tanggalSelesai,
      total_harga: totalHarga.replace(/\./g, ""),
    };

    console.log("Booking terkirim:", bookingData);
    alert("Booking berhasil (simulasi).");

    localStorage.removeItem("selected_vehicle");
    window.location.href = "/";
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">

      {/* BOOKING FORM */}
      <main className="flex-1 max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Formulir Pemesanan Kendaraan
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* PILIH KENDARAAN */}
          <div>
            <label className="block text-sm font-medium mb-1">Pilih Kendaraan</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              required
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            >
              <option value="">-- Pilih Kendaraan --</option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.nama} - Rp {v.harga.toLocaleString()}/hari
                </option>
              ))}
            </select>
          </div>

          {/* TANGGAL */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal Mulai</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tanggal Selesai</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
              />
            </div>
          </div>

          {/* TOTAL HARGA */}
          <div>
            <label className="block text-sm font-medium mb-1">Total Harga (Rp)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
              readOnly
              value={totalHarga}
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Konfirmasi Booking
          </button>
        </form>
      </main>
    </div>
  );
}