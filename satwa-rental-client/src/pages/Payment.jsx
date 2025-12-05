import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Payment() {
  const { state } = useLocation();

  if (!state) {
    return <p className="pt-24 text-center">Data booking tidak ditemukan.</p>;
  }

  const { vehicle, totalHarga, tanggalMulai, tanggalSelesai } = state;

  const [openSection, setOpenSection] = useState(null);
  const [openEwallet, setOpenEwallet] = useState(null);

  const toggleSection = (name) => {
    setOpenSection(openSection === name ? null : name);
    setOpenEwallet(null);
  };

  const toggleEwallet = (name) => {
    setOpenEwallet(openEwallet === name ? null : name);
  };

  return (
    <div className="pt-24 pb-20 px-6 container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Pembayaran</h1>

      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
        
        {/* Detail Pesanan */}
        <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>

        <p><b>Kendaraan:</b> {vehicle.name}</p>
        <p><b>Tanggal:</b> {tanggalMulai} - {tanggalSelesai}</p>
        <p><b>Total Pembayaran:</b> Rp {totalHarga.toLocaleString()}</p>

        <hr className="my-6" />

        {/* METODE PEMBAYARAN */}
        <h2 className="text-2xl font-bold mb-4">Metode Pembayaran</h2>

        {/* QRIS */}
        <div className="border rounded-xl mb-4">
          <button
            className="w-full text-left p-4 font-semibold text-blue-600"
            onClick={() => toggleSection("qris")}
          >
            QRIS
          </button>
          {openSection === "qris" && (
            <div className="p-4 border-t text-center">
              <p className="mb-3 text-gray-600">Scan QR ini untuk membayar:</p>
              <img src="./img/qr.png" alt="QRIS" className="w-64 mx-auto rounded shadow" />
            </div>
          )}
        </div>

        {/* BANK TRANSFER */}
        <div className="border rounded-xl mb-4">
          <button
            className="w-full text-left p-4 font-semibold text-green-600"
            onClick={() => toggleSection("bank")}
          >
            Transfer Bank Mandiri
          </button>
          {openSection === "bank" && (
            <div className="p-4 border-t">
              <p className="font-bold text-lg">123-456-7890</p>
              <p className="text-gray-600">A/N M Affan Afyga</p>
            </div>
          )}
        </div>

        {/* E-WALLET */}
        <div className="border rounded-xl mb-4">
          <button
            className="w-full text-left p-4 font-semibold text-purple-600"
            onClick={() => toggleSection("ewallet")}
          >
            E-Wallet
          </button>

          {openSection === "ewallet" && (
            <div className="border-t">

              {/* Dana */}
              <button
                className="w-full text-left p-4 font-medium"
                onClick={() => toggleEwallet("dana")}
              >
                Dana
              </button>
              {openEwallet === "dana" && (
                <div className="px-4 pb-4 text-gray-700">
                  <p><b>No Dana:</b> 081293735336</p>
                </div>
              )}

              {/* GoPay */}
              <button
                className="w-full text-left p-4 font-medium"
                onClick={() => toggleEwallet("gopay")}
              >
                GoPay
              </button>
              {openEwallet === "gopay" && (
                <div className="px-4 pb-4 text-gray-700">
                  <p><b>No GoPay:</b> 081293735336</p>
                </div>
              )}

              {/* ShopeePay */}
              <button
                className="w-full text-left p-4 font-medium"
                onClick={() => toggleEwallet("shopee")}
              >
                ShopeePay
              </button>
              {openEwallet === "shopee" && (
                <div className="px-4 pb-4 text-gray-700">
                  <p><b>No ShopeePay:</b> 081293735336</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* METODE LAIN */}
        <div className="border rounded-xl">
          <button
            className="w-full text-left p-4 font-semibold text-gray-700"
            onClick={() => toggleSection("lain")}
          >
            Metode Lain (Dalam Pengembangan)
          </button>

          {openSection === "lain" && (
            <div className="p-4 border-t text-gray-500">
              ShopeePay • OVO • LinkAja • Kredivo • Indomaret • Alfamart  
              <br />
              <b>⚠️ Belum tersedia</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
