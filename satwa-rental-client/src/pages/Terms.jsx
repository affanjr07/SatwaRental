import React from "react";

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
            mengirimkan foto KTP dan SIM A asli melalui WhatsApp resmi.
          </p>

          <p>
            Durasi sewa adalah <b>24 jam</b>. Melebihi batas waktu dikenakan biaya tambahan
            <b> 10% per jam</b>. Lebih dari 3 jam dihitung 1 hari.
          </p>

          <p>
            Pembayaran membutuhkan DP minimal 1x harga sewa. Sisa pembayaran saat kendaraan diterima.
          </p>

          <p>
            Penyewa wajib menitip uang jaminan. Jaminan dikembalikan maksimal 2×24 jam.
          </p>

          <p>Penyewa WAJIB membuat video kondisi mobil saat serah terima.</p>

          <p>BBM wajib dikembalikan sama seperti awal (1 kotak = Rp 50.000).</p>

          <p>
            Mobil boleh keluar Medan dengan izin khusus. Tanpa izin dikenakan denda Rp 5.000.000.
          </p>

          <p>Pihak rental tidak bertanggung jawab atas barang tertinggal.</p>

          <p>Penyewa dilarang mengganti sparepart tanpa izin.</p>

          <p>
            Semua pembayaran tidak dapat dikembalikan jika penyewa melanggar ketentuan.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center mt-16 text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} SatwaRental — Semua Hak Dilindungi.</p>
        <p className="mt-1">Medan, Indonesia</p>
      </footer>
    </div>
  );
}
