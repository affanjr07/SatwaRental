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
        <div className="w-[90%] max-w-[1000px] mx-auto text-left">
          <h2 className="text-3xl font-bold mb-6 text-center">Kisah SatwaRental</h2>

          <div className="leading-relaxed text-[16px] space-y-4">
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
            <div className="bg-white p-6 rounded-lg shadow w-[45%] min-w-[280px]">
              <h4 className="text-2xl font-bold text-green-600 mb-2">Visi</h4>
              <p>
                Menjadi platform rental kendaraan online terdepan di Indonesia yang dikenal karena keandalan, inovasi, dan kualitas pelayanannya.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white p-6 rounded-lg shadow w-[45%] min-w-[280px]">
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
            Siap untuk bepergian? Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi tim dukungan kami.
            Kami siap membantu Anda merencanakan perjalanan yang sempurna!
          </p>

          <a
            href="https://wa.me/6282166919100"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
          >
            Hubungi Kami Sekarang
          </a>
        </div>
      </section>

    </div>
  );
}