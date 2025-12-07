import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Tambahkan class Flexbox dan min-h-screen pada div utama
// Ini memastikan konten mengambil minimal satu layar penuh, dan footer didorong ke bawah.
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
    // PERUBAHAN UTAMA: Tambahkan flex flex-col dan min-h-screen
    <div className="w-full flex flex-col min-h-screen"> 

      {/* ===== CONTENT WRAPPER: Ambil semua ruang yang tersisa (flex-grow) ===== */}
      <div className="flex-grow">
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
              link="/promo"
              btn="Lihat Promo"
            />

            <Slide
              bg="from-purple-600 to-pink-600"
              title="Layanan 24 Jam"
              desc="Kami siap membantu kapan saja untuk kebutuhan mendadak kamu."
              link="https://wa.me/6282166919100"
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

        {/* ===== WHY US ===== */}
        <section className="my-16 text-center">

          {/* FLOATING WHATSAPP BUTTON */}
          <a
            href="https://wa.me/6282166919100"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-xl 
                        hover:bg-green-600 transition transform hover:scale-110 z-50" 
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
      </div> {/* Penutup div flex-grow */}

      {/* ===== FOOTER ===== */}
      {/* Footer sekarang akan didorong ke bagian bawah oleh flex-grow di atasnya */}
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
          © {new Date().getFullYear()} Satwa Rental — All Rights Reserved
        </p>
      </footer>

    </div>
  );
}

/* KOMPONEN LAINNYA TIDAK BERUBAH */
// ... (Slide, WhyUsCard, ReviewCard components tetap sama)