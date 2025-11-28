import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">

      {/* HERO */}
      <section className="w-full min-h-[400px] md:min-h-[500px] 
        flex flex-col justify-center items-center 
        bg-gradient-to-r from-blue-500 to-indigo-600 text-white">

        <h1 className="text-4xl font-bold mb-3">Sewa Mobil & Motor dengan Mudah</h1>
        <p className="text-lg mb-6">Temukan kendaraan terbaik untuk perjalananmu di mana saja, kapan saja.</p>

        <Link className="bg-white text-blue-600 px-6 py-2 rounded font-bold" to="/vehicles">
          Lihat Kendaraan
        </Link>
      </section>

      {/* WHY US */}
      <section className="my-12 text-center">
        <h2 className="text-3xl font-bold mb-10">Kenapa Memilih Kami?</h2>

        <div className="flex justify-center flex-wrap gap-6">
          {[
            "🛡️ Asuransi Komprehensif",
            "💸 Harga Terbaik",
            "⏱️ Proses Cepat",
            "🛠️ Kendaraan Terawat",
          ].map((text) => (
            <div
              key={text}
              className="bg-white p-6 rounded-lg shadow-lg w-60 
              hover:shadow-2xl hover:scale-105 transition"
            >
              <div className="text-4xl">{text.split(" ")[0]}</div>
              <h3 className="text-xl font-bold mt-3">
                {text.split(" ").slice(1).join(" ")}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
