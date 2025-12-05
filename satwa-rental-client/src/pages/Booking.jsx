// src/pages/Booking.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Booking() {
  const { id } = useParams(); // vehicle id from url
  const nav = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [tanggalMulai, setTanggalMulai] = useState("");
  const [tanggalSelesai, setTanggalSelesai] = useState("");
  const [totalHarga, setTotalHarga] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function loadVehicle() {
      try {
        const res = await fetch(`${API}/api/vehicles/${id}`);
        if (!res.ok) throw new Error("Gagal memuat kendaraan.");
        const data = await res.json();
        setVehicle(data);
      } catch (e) {
        console.error(e);
        setErr("Gagal memuat kendaraan.");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadVehicle();
  }, [id]);

  useEffect(() => {
    if (!vehicle || !tanggalMulai || !tanggalSelesai) {
      setTotalHarga(0);
      return;
    }
    const mulai = new Date(tanggalMulai);
    const selesai = new Date(tanggalSelesai);
    const diffDays = Math.ceil((selesai - mulai) / (1000 * 3600 * 24)) + 1;
    if (diffDays <= 0) {
      setTotalHarga(0);
    } else {
      setTotalHarga(diffDays * Number(vehicle.price_per_day));
    }
  }, [tanggalMulai, tanggalSelesai, vehicle]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!tanggalMulai || !tanggalSelesai) {
      setErr("Pilih tanggal mulai dan selesai.");
      return;
    }
    if (totalHarga <= 0) {
      setErr("Tanggal tidak valid.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      nav("/login");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        vehicle_id: Number(vehicle.id),
        tanggal_mulai: tanggalMulai,
        tanggal_selesai: tanggalSelesai,
        total_harga: totalHarga,
      };

      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Gagal memesan");
      }

      // sukses -> redirect ke profil / riwayat
      alert("Booking berhasil!");
      nav("/profil");
    } catch (e) {
      console.error(e);
      setErr(e.message || "Gagal menyimpan booking.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="pt-24 text-center">Memuat kendaraan...</div>;
  if (err && !vehicle) return <div className="pt-24 text-center text-red-500">{err}</div>;

  return (
    <div className="pt-24 pb-16 container mx-auto px-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Form Pemesanan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* KENDARAAN */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Kendaraan Dipilih</h2>

          <img
            src={vehicle.image_url}
            alt={vehicle.name}
            className="w-full h-56 object-cover rounded-lg mb-4"
            style={{ maxWidth: "420px" }}
          />

          <h3 className="text-2xl font-bold">{vehicle.name}</h3>
          <p className="text-gray-600">{vehicle.type}</p>
          <p className="text-blue-600 font-semibold text-lg mt-2">
            Rp {Number(vehicle.price_per_day).toLocaleString()}/hari
          </p>

          {/* spesifikasi from DB (array) */}
          {Array.isArray(vehicle.specification) && vehicle.specification.length > 0 && (
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

        {/* FORM */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Isi Data Pemesanan</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="mt-4 p-4 bg-gray-50 border rounded">
              <h3 className="font-bold mb-2">Ringkasan</h3>
              <p><strong>Kendaraan:</strong> {vehicle.name}</p>
              <p><strong>Tanggal:</strong> {tanggalMulai || "-"} — {tanggalSelesai || "-"}</p>
              <p><strong>Harga/hari:</strong> Rp {Number(vehicle.price_per_day).toLocaleString()}</p>
              <hr className="my-3" />
              <p className="text-xl font-bold">Total: Rp {Number(totalHarga).toLocaleString()}</p>
            </div>

            {err && <p className="text-red-600">{err}</p>}

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
