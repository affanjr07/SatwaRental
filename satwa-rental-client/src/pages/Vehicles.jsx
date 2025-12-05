import React, { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/vehicles`);
        const data = await res.json();

        if (Array.isArray(data)) setVehicles(data);
      } catch (err) {
        console.error("Fetch vehicle error:", err);
      }
    };

    load();
  }, []);

  const filteredVehicles = vehicles.filter((v) => {
    const nameMatch =
      v.name?.toLowerCase().includes(search.toLowerCase()) ||
      v.nama?.toLowerCase().includes(search.toLowerCase());

    const typeMatch =
      filterType === "all" ||
      v.type === filterType ||
      v.jenis === filterType;

    return nameMatch && typeMatch;
  });

  return (
    <>
      <div className="bg-gray-100 min-h-screen pt-24 pb-20">
        <h1 className="text-center text-4xl font-bold mb-10">
          Daftar Kendaraan
        </h1>

        {/* 🔍 Search + Filter */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 mb-10">
          <input
            type="text"
            placeholder="Cari kendaraan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-2/3 px-4 py-3 rounded-lg border shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full md:w-1/3 px-4 py-3 rounded-lg border shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Kendaraan</option>
            <option value="Mobil">Mobil</option>
            <option value="Motor">Motor</option>
          </select>
        </div>

        {/* LIST KENDARAAN */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {filteredVehicles.length === 0 ? (
            <p className="text-center col-span-3 text-gray-500 text-lg">
              Tidak ada kendaraan yang cocok dengan pencarian.
            </p>
          ) : (
            filteredVehicles.map((v) => (
              <VehicleCard key={v.id} v={v} />
            ))
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

          <div>
            <h3 className="text-2xl font-bold mb-3">SatwaRental</h3>
            <p className="text-gray-300">
              Platform rental mobil & motor terpercaya dengan harga terbaik dan layanan 24 jam.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Menu</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/vehicles" className="hover:text-white">Kendaraan</Link></li>
              <li><Link to="/about" className="hover:text-white">Tentang Kami</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Kontak</h4>
            <p className="text-gray-300">📍 Medan, Sumatera Utara</p>
            <p className="text-gray-300">☎ 0821-6691-9100</p>
            <p className="text-gray-300">✉ satwarental@gmail.com</p>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-8">
          © {new Date().getFullYear()} SatwaRental — All Rights Reserved
        </p>
      </footer>
    </>
  );
}
