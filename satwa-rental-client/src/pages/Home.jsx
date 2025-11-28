import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [index, setIndex] = useState(0);
  const total = 3;

  useEffect(() => {
    let width = 0;
    const progress = document.getElementById("progressBar");

    const interval = setInterval(() => {
      width++;
      if (progress) progress.style.width = width + "%";
      if (width >= 100) nextSlide();
    }, 50);

    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => setIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <div className="w-full">

      {/* ===== HERO SLIDER ===== */}
      <section className="relative overflow-hidden w-full">
        <div
          className="flex transition-transform duration-700"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {/* Slide 1 */}
          <Slide
            bg="from-blue-500 to-indigo-600"
            title="Sewa Mobil & Motor dengan Mudah"
            desc="Temukan kendaraan terbaik untuk perjalananmu di mana saja, kapan saja."
            link="/vehicles"
            btn="Lihat Kendaraan"
          />

          {/* Slide 2 */}
          <Slide
            bg="from-indigo-600 to-purple-600"
            title="Promo Akhir Tahun"
            desc="Diskon hingga 30% untuk semua kendaraan!"
            link="/promo"
            btn="Lihat Promo"
          />

          {/* Slide 3 */}
          <Slide
            bg="from-purple-600 to-pink-600"
            title="Layanan 24 Jam"
            desc="Kami siap membantu kapan saja untuk kebutuhan mendadak kamu."
            link="/layanan"
            btn="Pelajari Lebih"
          />
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
          <div id="progressBar" className="h-1 bg-white w-0"></div>
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white border border-white/30 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/40 transition"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white border border-white/30 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/40 transition"
        >
          ›
        </button>
      </section>

      {/* ===== WHY US (SESUAI GAMBAR) ===== */}
      <section className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-12">Kenapa Memilih Kami?</h2>

        <div className="flex justify-center flex-wrap gap-8">
          <WhyUsCard
            icon="🛡️"
            title="Asuransi Komprehensif"
            desc="Kendaraan aman dengan perlindungan penuh."
          />

          <WhyUsCard
            icon="💸"
            title="Harga Terbaik"
            desc="Tanpa biaya tersembunyi."
          />

          <WhyUsCard
            icon="⏱️"
            title="Proses Cepat"
            desc="Mudah & efisien."
          />

          <WhyUsCard
            icon="🛠️"
            title="Kendaraan Terawat"
            desc="Armada siap jalan selalu."
          />
        </div>
      </section>

    </div>
  );
}

/* ===== SLIDE COMPONENT ===== */
function Slide({ bg, title, desc, link, btn }) {
  return (
    <div
      className={`min-w-full min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center text-white bg-gradient-to-r ${bg}`}
    >
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-lg mb-6">{desc}</p>
      <Link className="bg-white text-blue-600 px-6 py-2 rounded font-bold" to={link}>
        {btn}
      </Link>
    </div>
  );
}

/* ===== WHY US CARD ===== */
function WhyUsCard({ icon, title, desc }) {
  return (
    <div
      className="bg-white p-8 rounded-xl shadow-lg w-72 hover:shadow-2xl hover:scale-105 transition text-center"
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
