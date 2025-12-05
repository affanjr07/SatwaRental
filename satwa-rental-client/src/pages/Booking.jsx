import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Booking() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);

  useEffect(() => {
    fetch(`${API}/api/vehicles/${id}`)
      .then((r) => r.json())
      .then((data) => setVehicle(data))
      .catch((err) => console.error("Gagal ambil kendaraan:", err));
  }, [id]);

  useEffect(() => {
    if (!vehicle || !tanggalMulai || !tanggalSelesai) return;

    const start = new Date(tanggalMulai);
    const end = new Date(tanggalSelesai);

    if (end < start) {
      setTotalHarga(0);
      return;
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    setTotalHarga(days * vehicle.price_per_day);
  }, [tanggalMulai, tanggalSelesai, vehicle]);

  if (!vehicle) {
    return <p className="pt-24 text-center text-lg">Memuat data kendaraan...</p>;
  }

  // 🔥 Convert specification string → bullet list otomatis
  const specs =
    typeof vehicle.specification === "string"
      ? vehicle.specification
          .split(/,|\n|;/) // pisah pakai koma / enter
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      : [];

  return (
    <div className="pt-24 pb-16 container mx-auto px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Form Pemesanan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* INFORMASI KENDARAAN */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Kendaraan Dipilih</h2>

          {/* 🔥 Gambar lebih kecil & jernih */}
          <div className="w-full flex justify-center">
            <img
              src={vehicle.image_url}
              alt={vehicle.name}
              className="rounded-lg object-cover shadow-md"
              style={{
                width: "340px",
                height: "230px",
                objectFit: "cover",
                imageRendering: "high-quality",
              }}
            />
          </div>

          <h3 className="text-2xl font-bold mt-4">{vehicle.name}</h3>
          <p className="text-gray-600">{vehicle.type}</p>
          <p className="text-blue-600 font-semibold text-lg mt-2">
            Rp {vehicle.price_per_day.toLocaleString()}/hari
          </p>

          {/* 🔥 SPESIFIKASI STRING */}
          {specs.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold mb-1">Spesifikasi:</h4>
              <ul className="list-disc ml-5 text-gray-600 space-y-1">
                {specs.map((sp, i) => (
                  <li key={i}>{sp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FORM PEMESANAN */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Isi Data Pemesanan</h2>

          <div className="mb-4">
            <label className="font-medium block mb-1">Tanggal Mulai</label>
            <input
              type="date"
              className="border p-2 w-full rounded"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="font-medium block mb-1">Tanggal Selesai</label>
            <input
              type="date"
              className="border p-2 w-full rounded"
              value={tanggalSelesai}
              onChange={(e) => setTanggalSelesai(e.target.value)}
            />
          </div>

          {/* RINGKASAN */}
          <div className="mt-6 p-4 bg-gray-50 border rounded-lg">
            <h3 className="font-bold text-lg mb-2">Ringkasan Pemesanan</h3>

            <p><strong>Kendaraan:</strong> {vehicle.name}</p>
            <p><strong>Tanggal:</strong> {tanggalMulai || "-"} sampai {tanggalSelesai || "-"}</p>
            <p><strong>Harga/Hari:</strong> Rp {vehicle.price_per_day.toLocaleString()}</p>

            <hr className="my-3" />

            <p className="text-xl font-bold text-green-600">
              Total: Rp {totalHarga.toLocaleString()}
            </p>
          </div>

          <button className="mt-5 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Konfirmasi Pesanan
          </button>
        </div>
      </div>
    </div>
  );
}
