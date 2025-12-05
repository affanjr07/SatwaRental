import React from "react";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();

  if (!state) {
    return <p className="pt-24 text-center text-lg">Data tidak ditemukan.</p>;
  }

  const { vehicle, totalHarga, tanggalMulai, tanggalSelesai } = state;

  return (
    <div className="pt-24 pb-20 px-6 container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Pembayaran</h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>

        <p><b>Kendaraan:</b> {vehicle.name}</p>
        <p><b>Tanggal:</b> {tanggalMulai} - {tanggalSelesai}</p>
        <p><b>Total Pembayaran:</b> Rp {totalHarga.toLocaleString()}</p>

        <hr className="my-6" />

        <h2 className="text-xl font-semibold mb-4">Metode Pembayaran</h2>

        {/* QRIS */}
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-2 text-blue-600">QRIS</h3>
          <p className="text-gray-600 mb-3">Scan QR berikut untuk pembayaran:</p>

          <img
            src="/qris.png"
            alt="QRIS"
            className="w-72 mx-auto rounded shadow"
          />
        </div>

        {/* BANK TRANSFER */}
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-2 text-green-700">Transfer Bank Mandiri</h3>
          <p className="text-gray-700 text-lg font-bold">
            123-456-7890 (Mandiri)
          </p>
          <p className="text-gray-600">A/N M Affan Afyga</p>
        </div>

        {/* E-WALLET */}
        <div className="border rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-2 text-purple-700">E-Wallet</h3>

          <p><b>DANA:</b> 081293735336</p>
          <p><b>GoPay:</b> 081293735336</p>
        </div>

        {/* Others */}
        <div className="border rounded-lg p-4">
          <h3 className="font-bold mb-2 text-gray-700">Metode Lain</h3>
          <p className="text-gray-500">ShopeePay, OVO, LinkAja, Kredivo, Indomaret, Alfamart, dll.</p>
          <p className="text-gray-500 font-semibold">⚠️ Sedang dalam tahap pengembangan.</p>
        </div>
      </div>
    </div>
  );
}
