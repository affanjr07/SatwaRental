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

    </div>
  );
}
