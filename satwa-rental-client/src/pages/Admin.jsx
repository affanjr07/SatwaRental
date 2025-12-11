import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user, token, logout } = useAuth();
  const nav = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [vehicles, setVehicles] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nama: "",
    jenis: "",
    harga: "",
    gambar: "",
    spesifikasi: ""
  });

  // ==========================
  // FETCH KENDARAAN (VERCEL / LOCAL)
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
  // FETCH LOGS (ADMIN)
  // ==========================
  const loadLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch(`${API}/api/bookings/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Failed load logs:", res.status, text);
        setLogs([]);
        setLoadingLogs(false);
        return;
      }
      const data = await res.json();
      setLogs(data || []);
    } catch (err) {
      console.error("Load logs error:", err);
      setLogs([]);
    } finally {
      setLoadingLogs(false);
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
    loadLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // SIMPAN / UPDATE KENDARAAN
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

    try {
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
    } catch (err) {
      console.error("Save vehicle error:", err);
      alert("Server error saat menyimpan kendaraan.");
    }
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

    try {
      const res = await fetch(`${API}/api/vehicles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      if (!res.ok) return alert(data.msg || "Gagal menghapus.");

      loadVehicles();
    } catch (err) {
      console.error("Delete vehicle error:", err);
      alert("Server error saat menghapus kendaraan.");
    }
  };

  // ==========================
  // ADMIN ACTIONS ON BOOKINGS
  // ==========================
  const markPaid = async (bookingId) => {
    if (!confirm("Tandai pembayaran sebagai LUNAS untuk booking ini?")) return;
    try {
      const res = await fetch(`${API}/api/bookings/${bookingId}/pay`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ set_status_to: "paid", payment_method: "admin_verify" })
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("markPaid failed:", res.status, text);
        alert("Gagal menandai lunas. Cek console.");
        return;
      }

      await loadLogs();
      alert("Booking ditandai sebagai LUNAS.");
    } catch (err) {
      console.error("markPaid error:", err);
      alert("Server error saat menandai lunas.");
    }
  };

  const markCompleted = async (bookingId) => {
    if (!confirm("Tandai booking ini sebagai SELESAI?")) return;
    try {
      const res = await fetch(`${API}/api/bookings/${bookingId}/pay`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ set_status_to: "completed", payment_method: "admin_update" })
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("markCompleted failed:", res.status, text);
        alert("Gagal menandai selesai. Cek console.");
        return;
      }

      await loadLogs();
      alert("Booking ditandai sebagai SELESAI.");
    } catch (err) {
      console.error("markCompleted error:", err);
      alert("Server error saat menandai selesai.");
    }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

      {/* LOG TRANSAKSI (ADMIN) */}
      <h2 className="text-xl font-bold mt-6 mb-3">Log Transaksi</h2>
      <div className="bg-white p-4 shadow rounded">
        {loadingLogs && <p>Memuat log...</p>}
        {!loadingLogs && logs.length === 0 && <p>Tidak ada transaksi.</p>}

        {logs.map((l) => (
          <div key={l.id} className="border-b py-3 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <h3 className="font-semibold">{l.vehicles?.name || "— Kendaraan"}</h3>
                <span className="text-xs text-gray-500">({l.booking_code})</span>
              </div>
              <p className="text-sm text-gray-600">{l.start_date} → {l.end_date}</p>
              <p className="text-sm text-green-600 font-bold">Rp {Number(l.total_price).toLocaleString()}</p>
              <p className="text-sm text-gray-600">Pembayaran: <span className="font-medium">{l.payment_status}</span> — Status: <span className="font-medium">{l.booking_status}</span></p>
              <p className="text-sm text-gray-600">Pelanggan: <span className="font-medium">{l.users?.username || l.users?.email || "Anon"}</span></p>
              <p className="text-xs text-gray-500">Email: {l.users?.email || "-"}</p>
            </div>

            <div className="mt-3 md:mt-0 flex gap-2">
              <button
                onClick={() => markPaid(l.id)}
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Tandai Lunas
              </button>
              <button
                onClick={() => markCompleted(l.id)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Tandai Selesai
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
