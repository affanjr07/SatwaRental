import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Home.jsx - cleaned (Option D)
 * - useRef for progress bar
 * - safe cleanup of intervals
 * - Slide renders button only if btn has text
 * - structure + formatting improved
 */

export default function Home() {
  const [index, setIndex] = useState(0);
  const total = 3;

  // ref for progress bar DOM element
  const progressRef = useRef(null);
  // store interval id to clear on unmount or index change
  const intervalRef = useRef(null);

  useEffect(() => {
    // reset progress bar
    let width = 0;
    if (progressRef.current) progressRef.current.style.width = "0%";

    // increment width every 50ms -> 100 * 50ms = 5000ms per slide
    intervalRef.current = setInterval(() => {
      width += 1;
      if (progressRef.current) progressRef.current.style.width = `${width}%`;

      if (width >= 100) {
        // next slide and reset progress (will be handled by effect cleanup + re-run)
        setIndex((prev) => (prev + 1) % total);
      }
    }, 50);

    return () => {
      // cleanup interval when index changes or component unmounts
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [index, total]);

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
          <Slide
            bg="from-blue-500 to-indigo-600"
            title="Sewa Mobil & Motor dengan Mudah"
            desc="Temukan kendaraan terbaik untuk perjalananmu di mana saja, kapan saja."
            link="/vehicles"
            btn="Lihat Kendaraan"
          />

          <Slide
            bg="from-indigo-600 to-purple-600"
            title="Promo Akhir Tahun"
            desc="Diskon hingga 30% untuk semua kendaraan!"
            link=""   // kosong -> tombol tidak tampil
            btn=""    // kosong -> tombol tidak tampil
          />

          <Slide
            bg="from-purple-600 to-pink-600"
            title="Layanan 24 Jam"
            desc="Kami siap membantu kapan saja untuk kebutuhan mendadak kamu."
            link="https://wa.me/6282166919100"
            btn="Pelajari Lebih"
            external
          />
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30">
          <div ref={progressRef} className="h-1 bg-white w-0" />
        </div>

        {/* Prev / Next Buttons */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white border border-white/30 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/40 transition"
        >
          ‹
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white border border-white/30 text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/40 transition"
        >
          ›
        </button>
      </section>

      {/* ===== WHY US ===== */}
      <section className="my-16 text-center">
        {/* FLOATING WHATSAPP BUTTON */}
        <a
          href="https://wa.me/6282166919100"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl hover:bg-green-600 transition transform hover:scale-110"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-10 h-10"
          />
        </a>

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

      {/* ===== CUSTOMER REVIEWS ===== */}
      <section className="py-20 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Review Pelanggan</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          <ReviewCard
            img="https://i.pravatar.cc/150?img=32"
            name="Rizka"
            review="Pelayanan sangat ramah, mobil dalam kondisi bersih dan wangi. Harga juga terjangkau. Recommended banget!"
            rating={5}
          />

          <ReviewCard
            img="https://i.pravatar.cc/150?img=12"
            name="Rizky Andriansyah"
            review="Driver datang tepat waktu, proses peminjaman cepat dan tidak ribet. Pasti sewa di sini lagi!"
            rating={5}
          />

          <ReviewCard
            img="https://i.pravatar.cc/150?img=45"
            name="Siti Aisyah"
            review="Motor yang saya sewa sangat irit dan performanya mantap. Pokoknya puas sekali!"
            rating={4}
          />
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-900 text-white py-10 mt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-3">Satwa Rental</h3>
            <p className="text-gray-300">
              Sewa mobil & motor terpercaya dengan harga terbaik dan layanan 24 jam.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-3">Menu</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-white">Kendaraan</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">Tentang Kami</Link>
              </li>
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
          © {new Date().getFullYear()} Satwa Rental — All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

/* ===== SLIDE COMPONENT ===== */
function Slide({ bg, title, desc, link = "", btn = "", external = false }) {
  const hasBtn = Boolean(btn && String(btn).trim() !== "");

  return (
    <div
      className={`min-w-full min-h-[400px] md:min-h-[500px] flex flex-col justify-center items-center text-white bg-gradient-to-r ${bg}`}
    >
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-lg mb-6">{desc}</p>

      {hasBtn && (
        external ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-6 py-2 rounded font-bold"
          >
            {btn}
          </a>
        ) : (
          <Link to={link} className="bg-white text-blue-600 px-6 py-2 rounded font-bold">
            {btn}
          </Link>
        )
      )}
    </div>
  );
}

/* ===== WHY US CARD ===== */
function WhyUsCard({ icon, title, desc }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-72 hover:shadow-2xl hover:scale-105 transition text-center">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

/* ===== REVIEW CARD ===== */
function ReviewCard({ img, name, review, rating }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition transform">
      <div className="flex items-center gap-4 mb-4">
        <img src={img} alt={name} className="w-16 h-16 rounded-full object-cover shadow" />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <div className="text-yellow-500 text-lg">
            {"⭐".repeat(Math.max(0, Math.min(5, rating || 0)))}
          </div>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed">“{review}”</p>
    </div>
  );
}
