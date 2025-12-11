import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

export default function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API}/api/bookings/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error("load orders:", err);
      }
    };
    load();
  }, []);

  return (
    <div className="pt-24 container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Riwayat Pemesanan</h1>
      {orders.length === 0 && <p>Tidak ada pemesanan.</p>}
      {orders.map((b) => (
        <div key={b.id} className="p-4 bg-white shadow rounded mb-3">
          <h2 className="text-lg font-semibold">{b.vehicles?.name || "—"}</h2>
          <p>{b.start_date} → {b.end_date}</p>
          <p className="text-green-600 font-bold">Total: Rp {Number(b.total_price).toLocaleString()}</p>
          <p className="text-sm text-gray-600">Status Pembayaran: {b.payment_status}</p>
          <p className="text-sm text-gray-600">Status Booking: {b.booking_status}</p>
          <p className="text-xs text-gray-500">Kode: {b.booking_code}</p>
        </div>
      ))}
    </div>
  );
}
