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
    </div>
  );
}
