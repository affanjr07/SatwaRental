import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { initialVehicles } from "../data/vehicles";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [form, setForm] = useState({ id:null, nama:"", jenis:"", harga:"", gambar:"" });

  useEffect(() => {
    if (!user || user.role !== "admin") {
      alert("Akses ditolak! Anda bukan admin.");
      nav("/login");
      return;
    }
    const stored = localStorage.getItem("satwa_vehicles");
    if (stored) setVehicles(JSON.parse(stored));
    else {
      setVehicles(initialVehicles);
      localStorage.setItem("satwa_vehicles", JSON.stringify(initialVehicles));
    }
  }, [user, nav]);

  const resetForm = () => setForm({ id:null, nama:"", jenis:"", harga:"", gambar:"" });

  const save = (e) => {
    e.preventDefault();
    if (!form.nama || !form.harga) return alert("Isi nama dan harga.");

    let list = [...vehicles];
    if (form.id) {
      // edit
      list = list.map(v => v.id === form.id ? { ...v, ...form } : v);
    } else {
      // add
      const newItem = { ...form, id: Date.now() };
      list.unshift(newItem);
    }
    setVehicles(list);
    localStorage.setItem("satwa_vehicles", JSON.stringify(list));
    resetForm();
  };

  const edit = (v) => setForm(v);
  const remove = (id) => {
    if (!confirm("Hapus kendaraan ini?")) return;
    const list = vehicles.filter(x => x.id !== id);
    setVehicles(list);
    localStorage.setItem("satwa_vehicles", JSON.stringify(list));
  };

  return (
    <div className="p-6 container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <div>
          <span className="mr-4">Halo, {user?.username}</span>
          <button onClick={() => { logout(); nav("/login"); }} className="bg-gray-100 px-3 py-1 rounded">Logout</button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6 max-w-lg">
        <h2 className="font-semibold mb-3">{form.id ? "Edit Kendaraan" : "Tambah Kendaraan"}</h2>
        <form onSubmit={save} className="space-y-3">
          <input value={form.nama} onChange={e=>setForm({...form, nama:e.target.value})} placeholder="Nama Kendaraan" className="w-full border px-3 py-2 rounded"/>
          <input value={form.jenis} onChange={e=>setForm({...form, jenis:e.target.value})} placeholder="Jenis (Mobil/Motor)" className="w-full border px-3 py-2 rounded"/>
          <input value={form.harga} onChange={e=>setForm({...form, harga: Number(e.target.value)})} placeholder="Harga" type="number" className="w-full border px-3 py-2 rounded"/>
          <input value={form.gambar} onChange={e=>setForm({...form, gambar:e.target.value})} placeholder="URL Gambar" className="w-full border px-3 py-2 rounded"/>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{form.id ? "Update" : "Simpan"}</button>
            <button type="button" onClick={resetForm} className="bg-gray-200 px-4 py-2 rounded">Reset</button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {vehicles.map(v => (
          <div key={v.id} className="bg-white p-4 rounded shadow">
            <img src={v.gambar} alt={v.nama} className="h-36 w-full object-cover mb-3 rounded"/>
            <h3 className="font-semibold">{v.nama}</h3>
            <p className="text-sm text-gray-500">{v.jenis}</p>
            <p className="text-blue-600 font-bold">Rp {v.harga.toLocaleString()}</p>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>edit(v)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
              <button onClick={()=>remove(v.id)} className="px-3 py-1 bg-red-500 text-white rounded">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
