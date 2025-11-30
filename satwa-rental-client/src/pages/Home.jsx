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
/* ===== REVIEW CARD ===== */
function ReviewCard({ img, name, review, rating }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition transform">
      
      {/* Foto & Nama */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={img}
          alt={name}
          className="w-16 h-16 rounded-full object-cover shadow"
        />
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>

          {/* Rating */}
          <div className="text-yellow-500 text-lg">
            {"⭐".repeat(rating)}
          </div>
        </div>
      </div>

      {/* Review */}
      <p className="text-gray-600 leading-relaxed">
        “{review}”
      </p>
    </div>
  );
}

