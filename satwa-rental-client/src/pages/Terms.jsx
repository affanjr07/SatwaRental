import React from "react";
import { Link } from "react-router-dom"; 
// Impor ikon dari pustaka seperti 'react-icons' jika tersedia
// Contoh: import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function Terms() {
  return (
    // Mengurangi padding-top dan memastikan min-h-screen untuk mengisi layar
    <div className="bg-gray-100 min-h-screen pt-10 pb-16 px-5"> 
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-blue-700">
          Syarat & Ketentuan Penyewaan 📜
        </h1>

        <p className="text-gray-600 text-center mb-8 border-b pb-4">
          Harap membaca syarat dan ketentuan berikut sebelum melakukan pemesanan kendaraan.
        </p>

        {/* MENGUBAH KE DAFTAR BERPOIN (UL/LI) */}
        <ul className="space-y-4 text-gray-800 leading-relaxed text-[15px] list-none p-0">
          {/* Catatan: Ikon bisa diganti dengan 'react-icons' atau komponen ikon lainnya */}
          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-3 mt-1">✅</span>
            Untuk menyewa mobil lepas kunci, calon penyewa Warga Negara Indonesia **WAJIB**
            mengirimkan foto **KTP** dan **SIM A** asli melalui WhatsApp resmi.
          </li>

          <li className="flex items-start">
            <span className="text-blue-500 font-bold mr-3 mt-1">🕒</span>
            Durasi sewa adalah **24 jam**. Melebihi batas waktu dikenakan biaya tambahan
            **10% per jam**. Lebih dari 3 jam dihitung **1 hari**.
          </li>

          <li className="flex items-start">
            <span className="text-yellow-600 font-bold mr-3 mt-1">💰</span>
            Pembayaran membutuhkan **DP minimal 1x harga sewa**. Sisa pembayaran saat kendaraan diterima.
          </li>

          <li className="flex items-start">
            <span className="text-yellow-600 font-bold mr-3 mt-1">🔒</span>
            Penyewa wajib menitip **uang jaminan**. Jaminan dikembalikan maksimal 2×24 jam.
          </li>

          <li className="flex items-start">
            <span className="text-green-500 font-bold mr-3 mt-1">📹</span>
            Penyewa **WAJIB** membuat **video kondisi mobil** saat serah terima.
          </li>

          <li className="flex items-start">
            <span className="text-orange-500 font-bold mr-3 mt-1">⛽</span>
            BBM wajib dikembalikan sama seperti awal (1 kotak = Rp 50.000).
          </li>

          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-3 mt-1">⚠️</span>
            Mobil boleh keluar Medan dengan **izin khusus**. Tanpa izin dikenakan denda **Rp 5.000.000**.
          </li>

          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-3 mt-1">❌</span>
            Pihak rental tidak bertanggung jawab atas **barang tertinggal**.
          </li>

          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-3 mt-1">🔧</span>
            Penyewa dilarang **mengganti sparepart** tanpa izin.
          </li>

          <li className="flex items-start">
            <span className="text-red-600 font-bold mr-3 mt-1">🚫</span>
            Semua pembayaran **tidak dapat dikembalikan** jika penyewa melanggar ketentuan.
          </li>
        </ul>
      </div>

      {/* FOOTER */}
      {/* Mengurangi mt-20 menjadi mt-10 agar jarak lebih proporsional */}
      <footer className="bg-gray-900 text-white py-10 mt-10">
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
              <li><Link to="/" className="hover:text-white transition duration-150">Home</Link></li>
              <li><Link to="/vehicles" className="hover:text-white transition duration-150">Kendaraan</Link></li>
              <li><Link to="/about" className="hover:text-white transition duration-150">Tentang Kami</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3">Kontak</h4>
            <p className="text-gray-300 flex items-center justify-center md:justify-start">
              <span className="mr-2">📍</span> Medan, Sumatera Utara
            </p>
            <p className="text-gray-300 flex items-center justify-center md:justify-start">
              <span className="mr-2">☎</span> 0821-6691-9100
            </p>
            <p className="text-gray-300 flex items-center justify-center md:justify-start">
              <span className="mr-2">✉</span> satwarental@gmail.com
            </p>
          </div>
        </div>

        <p className="text-center text-gray-400 mt-8">
          © {new Date().getFullYear()} SatwaRental — All Rights Reserved
        </p>
      </footer>
    </div>
  );
}