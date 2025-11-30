import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20 text-center">
        <div className="w-[90%] max-w-[1000px] mx-auto">
          <h1 className="text-4xl font-bold mb-4">Kami Adalah Mitra Perjalanan Anda</h1>
          <p className="text-lg mb-6">Membangun kepercayaan, menyediakan mobilitas.</p>
        </div>
      </section>

      {/* KISAH SATWARENTAL */}
      <section className="py-12 border-b border-gray-300 text-center">
        <div className="w-[90%] max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">Kisah SatwaRental</h2>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition transform duration-300 leading-relaxed text-[16px] space-y-4">
            <p>
              SatwaRental bukan sekadar bisnis rental biasa. Kami lahir dari frustrasi tiga anak muda di sebuah rumah makan di jl pembangunan pada awal tahun 2025.
            </p>
            <p>
              Kami muak dengan proses sewa yang ribet, mobil yang kurang terawat, dan harga yang nggak transparan. Kami bertanya:
              <strong> "Kenapa mencari kendaraan harus serumit ini"</strong>
            </p>
            <p>
              Dari pertanyaan itu, lahir SatwaRental: sebuah platform yang menjembatani teknologi dengan kenyamanan berkendara.
              Kami berkomitmen untuk menghadirkan armada yang <strong>#SiapJalan</strong>, proses yang 100% digital, dan layanan support
              yang se-responsif chat teman. Kami percaya, petualangan keren dimulai dengan kendaraan yang tepat—dan itu harus mudah diakses oleh siapa saja!
            </p>
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-12 bg-gray-100">
        <div className="w-[90%] max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Visi & Misi Kami</h2>
          <div className="flex justify-around flex-wrap gap-6 mt-6">

            {/* Visi */}
            <div className="bg-white p-6 rounded-xl shadow w-[45%] min-w-[280px] transition transform duration-300 hover:shadow-2xl hover:scale-[1.03]">
              <h4 className="text-2xl font-bold text-green-600 mb-2">Visi</h4>
              <p>
                Menjadi platform rental kendaraan online terdepan di Indonesia yang dikenal karena keandalan, inovasi, dan kualitas pelayanannya.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-6 rounded-xl shadow w-[45%] min-w-[280px] transition transform duration-300 hover:shadow-2xl hover:scale-[1.03]">
              <h4 className="text-2xl font-bold text-green-600 mb-2">Misi</h4>
              <ul className="list-disc ml-5 space-y-2">
                <li>Menyediakan armada kendaraan yang beragam, terbaru, dan selalu dalam kondisi terbaik.</li>
                <li>Memberikan proses penyewaan yang cepat dan transparan melalui teknologi.</li>
                <li>Menjaga kepuasan pelanggan melalui dukungan 24/7 dan asuransi komprehensif.</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* HUBUNGI KAMI */}
      <section className="py-12 text-center">
        <div className="w-[90%] max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold mb-4">Mari Terhubung!</h2>
          <p className="mb-6">
            Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
          </p>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/6282166919100"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl 
                    hover:bg-green-600 transition transform hover:scale-110"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-10 h-10"
        />
      </a>

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