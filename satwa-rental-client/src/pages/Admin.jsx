import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user, token, logout } = useAuth();
  const nav = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nama: "",
    jenis: "",
    harga: "",
    gambar: "",
    spesifikasi: ""
  });

  // ==========================
  // FETCH KENDARAAN (VERCEL)
  // ==========================
  const loadVehicles = async () => {
    try {
      const res = await fetch(`${API}/api/vehicles`);
      const data = await res.json();
      setVehicles(data);
    } catch (err) {
      console.error("Fetch vehicles error:", err);
    }
  };

  // ==========================
  // CHECK ADMIN & LOAD DATA
  // ==========================
  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Akses ditolak! Anda bukan admin.");
      nav("/login");
      return;
    }
    loadVehicles();
  }, [user]);

  // ==========================
  // RESET FORM
  // ==========================
  const resetForm = () =>
    setForm({
      id: null,
      nama: "",
      jenis: "",
      harga: "",
      gambar: "",
      spesifikasi: ""
    });

  // ==========================
  // SIMPAN / UPDATE
  // ==========================
  const save = async (e) => {
    e.preventDefault();

    if (!form.nama || !form.harga) return alert("Isi nama dan harga.");

    const payload = {
      name: form.nama,
      type: form.jenis,
      price_per_day: Number(form.harga),
      image_url: form.gambar,
      specification: form.spesifikasi
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s !== "")
    };

    const method = form.id ? "PUT" : "POST";
    const endpoint = form.id
      ? `${API}/api/vehicles/${form.id}`
      : `${API}/api/vehicles`;

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) return alert(data.msg || "Gagal menyimpan.");

    loadVehicles();
    resetForm();
  };

  // ==========================
  // EDIT
  // ==========================
  const edit = (v) =>
    setForm({
      id: v.id,
      nama: v.name,
      jenis: v.type,
      harga: v.price_per_day,
      gambar: v.image_url,
      spesifikasi: v.specification?.join("\n") || ""
    });

  // ==========================
  // DELETE
  // ==========================
  const remove = async (id) => {
    if (!confirm("Hapus kendaraan ini?")) return;

    const res = await fetch(`${API}/api/vehicles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    if (!res.ok) return alert(data.msg || "Gagal menghapus.");

    loadVehicles();
  };

  return (
    <div className="p-6 container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <div>
          <span className="mr-4">Halo, {user?.username}</span>
          <button
            onClick={() => {
              logout();
              nav("/login");
            }}
            className="bg-gray-100 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* FORM INPUT */}
      <div className="bg-white p-6 rounded shadow mb-6 max-w-lg">
        <h2 className="font-semibold mb-3">
          {form.id ? "Edit Kendaraan" : "Tambah Kendaraan"}
        </h2>

        <form onSubmit={save} className="space-y-3">
          <input
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Nama Kendaraan"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            value={form.jenis}
            onChange={(e) => setForm({ ...form, jenis: e.target.value })}
            placeholder="Jenis (Mobil/Motor)"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
            placeholder="Harga per hari"
            type="number"
            className="w-full border px-3 py-2 rounded"
          />

          <input
            value={form.gambar}
            onChange={(e) => setForm({ ...form, gambar: e.target.value })}
            placeholder="URL Gambar"
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            value={form.spesifikasi}
            onChange={(e) =>
              setForm({ ...form, spesifikasi: e.target.value })
            }
            placeholder={`Spesifikasi (1 baris = 1 poin)\nAC Dingin\n7 Kursi\nTransmisi Manual`}
            className="w-full border px-3 py-2 rounded h-32"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {form.id ? "Update" : "Simpan"}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* LIST KENDARAAN */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <div key={v.id} className="bg-white p-4 rounded shadow">
            <img
              src={v.image_url}
              alt={v.name}
              className="h-36 w-full object-cover mb-3 rounded"
            />
            <h3 className="font-semibold">{v.name}</h3>
            <p className="text-sm text-gray-500">{v.type}</p>
            <p className="text-blue-600 font-bold">
              Rp {Number(v.price_per_day).toLocaleString()}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => edit(v)}
                className="px-3 py-1 bg-yellow-400 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => remove(v.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
