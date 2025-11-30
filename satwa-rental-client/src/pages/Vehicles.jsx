import React, { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import { initialVehicles } from "../data/vehicles";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("satwa_vehicles");
    if (stored) setVehicles(JSON.parse(stored));
    else {
      setVehicles(initialVehicles);
      localStorage.setItem("satwa_vehicles", JSON.stringify(initialVehicles));
    }
  }, []);

  const handleBook = (v) => {
    localStorage.setItem("selected_vehicle", JSON.stringify(v));
    window.location.href = "/booking";
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-32 pb-20">

      {/* TITLE */}
      <h1 className="text-center text-3xl font-bold mb-10">
        Daftar Kendaraan
      </h1>

      {/* VEHICLE GRID */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} v={v} onBook={handleBook} />
        ))}
      </div>

      {/* ========================================= */}
      {/* FLOATING WHATSAPP BUTTON */}
      {/* ========================================= */}
      <a
        href="https://wa.me/6282166919100"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl 
                  hover:bg-green-600 transition transform hover:scale-110 z-50"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-10 h-10"
        />
      </a>

      {/* FOOTER */}
<footer className="bg-gray-900 text-white py-10 mt-20">
  <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

    {/* Brand */}
    <div>
      <h3 className="text-2xl font-bold mb-3">SatwaRental</h3>
      <p className="text-gray-300">
        Platform rental mobil & motor terpercaya dengan harga terbaik dan layanan 24 jam.
      </p>
    </div>

    {/* Menu */}
    <div>
      <h4 className="text-xl font-semibold mb-3">Menu</h4>
      <ul className="space-y-2 text-gray-300">
        <li><a href="/" className="hover:text-white">Home</a></li>
        <li><a href="/vehicles" className="hover:text-white">Kendaraan</a></li>
        <li><a href="/about" className="hover:text-white">Tentang Kami</a></li>
      </ul>
    </div>

    {/* Contact */}
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


    </div>
  );
}