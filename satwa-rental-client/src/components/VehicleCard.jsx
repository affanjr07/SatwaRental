import React from "react";

export default function VehicleCard({ v, onBook }) {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img src={v.gambar} alt={v.nama} className="w-full h-48 object-cover" />

      <div className="p-4">
        <h4 className="text-lg font-semibold">{v.nama}</h4>
        <p className="text-sm text-gray-500 mb-2">{v.jenis}</p>
        <p className="text-blue-600 font-bold mb-3">
          Rp {v.harga.toLocaleString()}/hari
        </p>

        {/* ⭐ Spesifikasi kendaraan (jika ada) */}
        {Array.isArray(v.spesifikasi) && v.spesifikasi.length > 0 && (
          <ul className="text-sm text-gray-600 mb-4 space-y-1">
            {v.spesifikasi.map((item, index) => (
              <li key={index} className="flex items-start gap-1">
                <span>🔹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={() => onBook?.(v)}
          className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sewa Sekarang
        </button>
      </div>
    </div>
  );
}
