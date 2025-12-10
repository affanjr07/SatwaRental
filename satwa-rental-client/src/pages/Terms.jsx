import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Terms() {
  // List syarat
  const rules = [
    "Untuk menyewa mobil lepas kunci, calon penyewa Warga Negara Indonesia WAJIB mengirimkan foto KTP dan SIM A asli melalui WhatsApp resmi.",
    "Durasi sewa adalah 24 jam. Melebihi batas waktu dikenakan biaya tambahan 10% per jam. Lebih dari 3 jam dihitung 1 hari.",
    "Pembayaran membutuhkan DP minimal 1x harga sewa. Sisa pembayaran saat kendaraan diterima.",
    "Penyewa wajib menitip uang jaminan. Jaminan dikembalikan maksimal 2×24 jam.",
    "Penyewa WAJIB membuat video kondisi mobil saat serah terima.",
    "BBM wajib dikembalikan sama seperti awal (1 kotak = Rp 50.000).",
    "Mobil boleh keluar Medan dengan izin khusus. Tanpa izin dikenakan denda Rp 5.000.000.",
    "Pihak rental tidak bertanggung jawab atas barang tertinggal.",
    "Penyewa dilarang mengganti sparepart tanpa izin.",
    "Semua pembayaran tidak dapat dikembalikan jika penyewa melanggar ketentuan.",
  ];

  // Animasi container – untuk stagger children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-28 pb-20 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-gray-200"
        >
          <h1 className="text-4xl font-extrabold text-center mb-6 text-blue-700">
            Syarat & Ketentuan Penyewaan
          </h1>

          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Harap membaca syarat dan ketentuan berikut sebelum melakukan pemesanan kendaraan
            untuk kenyamanan bersama.
          </p>

          {/* LIST SYARAT */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {rules.map((text, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="flex items-start gap-4 bg-blue-50/40 p-5 rounded-xl border border-blue-100"
              >
                <CheckCircle className="text-blue-600 shrink-0" size={28} />
                <p className="text-gray-700 leading-relaxed">{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>

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
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/vehicles" className="hover:text-white">Kendaraan</Link></li>
              <li><Link to="/about" className="hover:text-white">Tentang Kami</Link></li>
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
