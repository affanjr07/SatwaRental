import React, { useState, useEffect } from "react";
import VehicleCard from "../components/VehicleCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

export default function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/vehicles`);
        const data = await res.json();
        setVehicles(data);
      } catch (err) {
        console.error("Fetch vehicle error:", err);
      }
    };

    load();
  }, []);

  const handleBook = (v) => {
    if (!user) {
      alert("Silakan login sebelum melakukan pemesanan.");
      nav("/login");
      return;
    }

    localStorage.setItem("selected_vehicle", JSON.stringify(v));

    // ⬇⬇ FIX UTAMA HARUS ADA ID
    nav(`/booking/${v.id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-32 pb-20">
      <h1 className="text-center text-3xl font-bold mb-10">Daftar Kendaraan</h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} v={v} onBook={handleBook} />
        ))}
      </div>
    </div>
  );
}
