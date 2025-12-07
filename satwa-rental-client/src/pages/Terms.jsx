import React from "react";
// Impor 'Link' dari 'react-router-dom'
// Pastikan Anda telah menginstal 'react-router-dom' di proyek Anda
import { Link } from "react-router-dom"; 

export default function Terms() {
  return (
    <div className="bg-gray-100 min-h-screen pt-24 pb-16 px-5">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl border">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-blue-700">
          Syarat & Ketentuan Penyewaan
        </h1>

        <p className="text-gray-600 text-center mb-10">
          Harap membaca syarat dan ketentuan berikut sebelum melakukan pemesanan kendaraan.
        </p>

        <div className="space-y-5 text-gray-700 leading-relaxed text-[15px]">
          <p>
            Untuk menyewa mobil lepas kunci, calon penyewa Warga Negara Indonesia WAJIB
            mengirimkan foto **KTP** dan **SIM A** asli melalui WhatsApp resmi.
          </p>

          <p>
            Durasi sewa adalah **24 jam**. Melebihi batas waktu dikenakan biaya tambahan
            **10% per jam**. Lebih dari 3 jam dihitung **1 hari**.
          </p>

          <p>
            Pembayaran membutuhkan **DP minimal 1x harga sewa**. Sisa pembayaran saat kendaraan diterima.
          </p>

          <p>
            Penyewa wajib menitip **uang jaminan**. Jaminan dikembalikan maksimal 2×24 jam.
          </p>

          <p>Penyewa WAJIB membuat **video kondisi mobil** saat serah terima.</p>

          <p>BBM wajib dikembalikan sama seperti awal (1 kotak = Rp 50.000).</p>

          <p>
            Mobil boleh keluar Medan dengan **izin khusus**. Tanpa izin dikenakan denda **Rp 5.000.000**.
          </p>

          <p>Pihak rental tidak bertanggung jawab atas **barang tertinggal**.</p>

          <p>Penyewa dilarang **mengganti sparepart** tanpa izin.</p>

          <p>
            Semua pembayaran **tidak dapat dikembalikan** jika penyewa melanggar ketentuan.
          </p>
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
              {/* Menggunakan komponen Link */}
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
    </div>
  );
}