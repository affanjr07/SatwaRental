// src/pages/Booking.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Booking() {
  const { id } = useParams();
  const nav = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  // ============================================================
  // LOAD VEHICLE BY ID
  // ============================================================
  useEffect(() => {
    async function loadVehicle() {
      try {
        const res = await fetch(`${API}/api/vehicles/${id}`);

        if (!res.ok) throw new Error("Gagal memuat kendaraan.");

        const data = await res.json();
        setVehicle(data);
      } catch (e) {
        console.error(e);
        setErr("Gagal memuat kendaraan");
      } finally {
        setLoading(false);
      }
    }
    loadVehicle();
  }, [id]);

  // ============================================================
  // HITUNG TOTAL HARGA
  // ============================================================
  useEffect(() => {
    if (!vehicle || !tanggalMulai || !tanggalSelesai) return;

    const mulai = new Date(tanggalMulai);
    const selesai = new Date(tanggalSelesai);

    // hitung hari
    const diffDays =
      Math.ceil((selesai - mulai) / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays <= 0) {
      setTotalHarga(0);
    } else {
      setTotalHarga(diffDays * Number(vehicle.price_per_day));
    }
  }, [tanggalMulai, tanggalSelesai, vehicle]);

  // ============================================================
  // SUBMIT BOOKING
  // ============================================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!tanggalMulai || !tanggalSelesai)
      return setErr("Pilih tanggal mulai dan selesai.");

    const token = localStorage.getItem("token");
    if (!token) return nav("/login");

    setSubmitting(true);

    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehicle_id: Number(id),
          tanggal_mulai: tanggalMulai,
          tanggal_selesai: tanggalSelesai,
          total_harga: totalHarga,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Gagal memesan");

      alert("Booking berhasil!");
      nav("/profil");
    } catch (e) {
      setErr(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ============================================================
  // LOADING / ERROR
  // ============================================================
  if (loading)
    return <div className="pt-24 text-center">Memuat kendaraan...</div>;

  if (!vehicle)
    return (
      <div className="pt-24 text-center text-red-600">
        Tidak ada data kendaraan
      </div>
    );

  // ============================================================
  // UI
  // ============================================================
  return (
    <div className="pt-24 pb-16 container mx-auto px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Form Pemesanan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* INFO KENDARAAN */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Kendaraan Dipilih</h2>

          <img
            src={vehicle.image_url}
            alt={vehicle.name}
            className="w-full h-64 object-cover rounded-lg mb-4 border"
          />

          <h3 className="text-2xl font-bold">{vehicle.name}</h3>
          <p className="text-gray-600">{vehicle.type}</p>
          <p className="text-blue-600 font-semibold text-lg mt-2">
            Rp {Number(vehicle.price_per_day).toLocaleString()}/hari
          </p>

          {/* SPESIFIKASI */}
          {Array.isArray(vehicle.specification) &&
            vehicle.specification.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-1">Spesifikasi:</h4>
                <ul className="list-disc ml-5 text-gray-600 space-y-1">
                  {vehicle.specification.map((sp, i) => (
                    <li key={i}>{sp}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {/* FORM PEMESANAN */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Isi Data Pemesanan</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* tanggal mulai */}
            <div>
              <label className="block mb-1">Tanggal Mulai</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded"
                value={tanggalMulai}
                onChange={(e) => setTanggalMulai(e.target.value)}
                required
              />
            </div>

            {/* tanggal selesai */}
            <div>
              <label className="block mb-1">Tanggal Selesai</label>
              <input
                type="date"
                className="w-full border px-4 py-2 rounded"
                value={tanggalSelesai}
                onChange={(e) => setTanggalSelesai(e.target.value)}
                required
              />
            </div>

            {/* RINGKASAN */}
            <div className="mt-4 p-4 bg-gray-50 border rounded">
              <h3 className="font-bold mb-2">Ringkasan</h3>
              <p>
                <strong>Kendaraan:</strong> {vehicle.name}
              </p>
              <p>
                <strong>Tanggal:</strong> {tanggalMulai || "-"} —{" "}
                {tanggalSelesai || "-"}
              </p>
              <p>
                <strong>Harga/hari:</strong>{" "}
                Rp {Number(vehicle.price_per_day).toLocaleString()}
              </p>
              <hr className="my-3" />
              <p className="text-xl font-bold">
                Total: Rp {Number(totalHarga).toLocaleString()}
              </p>
            </div>

            {/* ERROR */}
            {err && <p className="text-red-600">{err}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              {submitting ? "Memproses..." : "Konfirmasi Pesanan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
