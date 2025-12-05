import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../supabaseClient";

export default function Booking() {
  const { id } = useParams(); // ambil ID dari URL
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    async function fetchVehicle() {
      const { data, error } = await supabase
        .from("vehicles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setVehicle(data);
      }
      setLoading(false);
    }

    fetchVehicle();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase.from("bookings").insert([
      {
        vehicle_id: id,
        start_date: form.start_date,
        end_date: form.end_date,
      },
    ]);

    if (error) {
      alert("Booking gagal: " + error.message);
    } else {
      alert("Booking Berhasil!");
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!vehicle)
    return <p className="text-center mt-10 text-red-500">Kendaraan tidak ditemukan</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-4">Booking Kendaraan</h1>

      <div className="border p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold">{vehicle.name}</h2>
        <p className="text-gray-600">Tipe: {vehicle.type}</p>
        <p className="text-gray-600">Harga: Rp {vehicle.price}/hari</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Tanggal Mulai</label>
          <input
            type="date"
            required
            className="w-full border p-2 rounded"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          />
        </div>

        <div>
          <label className="block font-medium">Tanggal Selesai</label>
          <input
            type="date"
            required
            className="w-full border p-2 rounded"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 px-5 py-2 text-white rounded hover:bg-blue-700"
        >
          Pesan Sekarang
        </button>
      </form>
    </div>
  );
}
