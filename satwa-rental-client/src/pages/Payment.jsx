import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, AlertTriangle, XCircle } from "lucide-react";
import qris_image from "../assets/qris_image.png";

export default function Payment() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openMethod, setOpenMethod] = useState(null);
  const [copied, setCopied] = useState("");
  // State baru untuk mengelola alur konfirmasi: 'pending' atau 'confirmed'
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [formData, setFormData] = useState({
    name: "John Doe", // Simulasi data awal
    email: "johndoe@example.com", // Simulasi data awal
    whatsapp: "081234567890", // Simulasi data awal
  });

  const paymentData = {
    ewallet: {
      label: "E-Wallet",
      methods: {
        dana: {
          label: "Dana",
          number: "081293735336 (a.n. Muhammad Affan Afyga)",
          logo: "https://images.seeklogo.com/logo-png/39/2/dana-e-wallet-app-logo-png_seeklogo-399948.png",
        },
        gopay: {
          label: "GoPay",
          number: "081293735336 (a.n. Muhammad Affan Afyga)",
          logo: "https://images.seeklogo.com/logo-png/36/2/gopay-logo-png_seeklogo-369813.png",
        },
        shopeepay: {
          label: "ShopeePay",
          number: "081293735336 (a.n. Muhammad Affan Afyga)",
          logo: "https://images.seeklogo.com/logo-png/50/2/shopeepay-logo-png_seeklogo-504053.png",
        },
        qris: {
          label: "QRIS",
          number: "SCAN QR",
          logo: "https://images.seeklogo.com/logo-png/39/2/quick-response-code-indonesia-standard-qris-logo-png_seeklogo-391791.png",
          qris_image: qris_image,
        },
      },
    },

    bank: {
      label: "Bank Transfer",
      methods: {
        mandiri: {
          label: "Bank Mandiri",
          number: "1050021027291 (a.n. Muhammad Affan Afyga)",
          logo: "https://images.seeklogo.com/logo-png/1/2/bank-mandiri-logo-png_seeklogo-16290.png",
        },
        bca: {
          label: "Bank BCA",
          number: "COMING SOON",
          logo: "https://images.seeklogo.com/logo-png/23/2/bca-bank-logo-png_seeklogo-232742.png",
        },
        bri: {
          label: "Bank BRI",
          number: "COMING SOON",
          logo: "https://images.seeklogo.com/logo-png/47/2/bank-rakyat-indonesia-logo-png_seeklogo-474339.png",
        },
      },
    },
  };

  const copyText = (text, key) => {
    // Hanya salin nomor rekening/HP, bukan nama atau instruksi
    const numberToCopy = text.split(" ")[0];

    if (numberToCopy === "SCAN" || numberToCopy === "COMING") return;
    
    // Fallback for clipboard access restriction (though navigator.clipboard is generally preferred)
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(numberToCopy).then(() => {
            setCopied(key);
            setTimeout(() => setCopied(""), 1400);
        });
    } else {
        // Fallback for older browsers
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = numberToCopy;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
        setCopied(key);
        setTimeout(() => setCopied(""), 1400);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.name && formData.email && formData.whatsapp;

  // Handler untuk tombol Konfirmasi Pembayaran
  const handleConfirmation = () => {
    if (!isFormValid) {
        // Dalam aplikasi nyata, gunakan toast/modal
        alert("Mohon lengkapi semua Detail Pelanggan.");
        return;
    }
    if (!openMethod) {
        // Dalam aplikasi nyata, gunakan toast/modal
        alert("Mohon pilih salah satu Metode Pembayaran terlebih dahulu.");
        return;
    }

    // SIMULASI: Mengubah status untuk menampilkan layar konfirmasi
    setPaymentStatus('confirmed');
  };

  // Komponen Tampilan Konfirmasi Admin (Simulasi)
  const ConfirmationScreen = () => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8 sm:p-12 bg-white rounded-2xl shadow-xl border-4 border-green-400"
    >
        <Check size={80} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Pembayaran Terkonfirmasi!</h2>
        <p className="text-lg text-gray-600 mb-6">
            Detail pembayaran Anda telah diterima dan sedang diproses.
        </p>
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-left">
            <p className="font-semibold text-blue-700 mb-2">Status Pesanan:</p>
            <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg shadow-inner">
                <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-800 font-medium">Menunggu Verifikasi Admin</span>
            </div>
            <p className="text-sm text-gray-500 mt-3">
                Admin akan memverifikasi pembayaran yang Anda lakukan menggunakan metode **{paymentData[openCategory]?.methods[openMethod]?.label}** dan mengirimkan konfirmasi akhir ke WhatsApp **{formData.whatsapp}**.
            </p>
        </div>

        <button 
            onClick={() => setPaymentStatus('pending')}
            className="w-full mt-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors shadow-md"
        >
            Kembali ke Pembayaran
        </button>
    </motion.div>
  );

  return (
    <div className="max-w-xl mx-auto mt-12 p-4 bg-gray-50 rounded-3xl shadow-2xl">

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent drop-shadow-md">
        Simulasi Pembayaran
      </h1>

      {/* Conditional Rendering based on paymentStatus */}
      {paymentStatus === 'confirmed' ? (
        <ConfirmationScreen />
      ) : (
        <>
          {/* CUSTOMER DETAILS SIMULATION */}
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6 border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Detail Pelanggan (Simulasi)</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Atas Nama"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Aktif"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder="Nomor WhatsApp"
                value={formData.whatsapp}
                onChange={handleFormChange}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-xl flex items-start text-sm">
                <AlertTriangle size={20} className="mr-2 mt-0.5 min-w-[20px]"/>
                <span>Pastikan detail ini benar karena digunakan untuk konfirmasi pemesanan Anda.</span>
            </div>
          </div>

          {/* Payment Categories */}
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Pilih Metode Pembayaran</h2>
          {Object.entries(paymentData).map(([catKey, cat]) => (
            <div key={catKey} className="mb-4">

              {/* CATEGORY BUTTON */}
              <button
                onClick={() => setOpenCategory(openCategory === catKey ? null : catKey)}
                className="w-full bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl duration-200 
                           flex justify-between items-center font-bold text-gray-800 border border-gray-200 hover:border-blue-400 transition"
              >
                <span>{cat.label}</span>
                <span className="text-xl transform transition-transform duration-300">{openCategory === catKey ? "▲" : "▼"}</span>
              </button>

              {/* CATEGORY DROPDOWN */}
              <AnimatePresence>
                {openCategory === catKey && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-2"
                  >
                    <div className="mt-3 space-y-3">

                      {Object.entries(cat.methods).map(([methodKey, method]) => (
                        <div key={methodKey}>

                          {/* PAYMENT METHOD BUTTON */}
                          <button
                            onClick={() =>
                              setOpenMethod(openMethod === methodKey ? null : methodKey)
                            }
                            // Highlight selected method
                            className={`w-full flex items-center gap-4 bg-white shadow-md hover:shadow-lg 
                                       rounded-2xl border p-4 duration-200 text-left transition-all
                                       ${openMethod === methodKey ? 'border-4 border-purple-500 ring-2 ring-purple-300' : 'border-gray-200'}`}
                          >
                            <img
                              src={method.logo}
                              className="w-12 h-12 rounded-xl object-contain p-1 border"
                              alt={method.label}
                              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/48x48/CCCCCC/333333?text=Logo"; }}
                            />
                            <span className="font-semibold text-lg flex-grow">{method.label}</span>
                            <span className="text-gray-400">{openMethod === methodKey ? "▲" : "▼"}</span>
                          </button>

                          {/* PAYMENT METHOD DROPDOWN CONTENT */}
                          <AnimatePresence>
                            {openMethod === methodKey && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="bg-gray-100 border rounded-2xl p-4 shadow-inner mt-2">
                                    {/* ACCOUNT / NUMBER INFO */}
                                    <div className="flex justify-between items-center mb-3">
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                {method.number.includes("SCAN QR") ? "Instruksi" : "Nomor Pembayaran"}
                                            </p>
                                            <p className="font-mono font-bold text-lg sm:text-xl text-blue-700">
                                                {method.number}
                                            </p>
                                        </div>

                                        {method.number !== "SCAN QR" && method.number !== "COMING SOON" && (
                                            <button
                                                onClick={() => copyText(method.number, methodKey)}
                                                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl duration-200 shadow-md transition-all"
                                            >
                                                {copied === methodKey ? <Check size={18} /> : <Copy size={18} />}
                                                {copied === methodKey ? "Tersalin" : "Salin No."}
                                            </button>
                                        )}
                                    </div>
                                    
                                    {/* QRIS QR IMAGE DISPLAY */}
                                    {method.label === "QRIS" && (
                                      <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-4 p-4 bg-white rounded-xl text-center"
                                      >
                                        <img
                                          src={method.qris_image}
                                          className="w-48 mx-auto shadow-lg rounded-lg border-4 border-gray-200"
                                          alt="QRIS Code"
                                        />
                                        <p className="text-center text-sm mt-3 text-gray-600">
                                          Scan QR untuk melanjutkan pembayaran.
                                        </p>
                                      </motion.div>
                                    )}

                                    {/* COMING SOON MESSAGE */}
                                    {method.number === "COMING SOON" && (
                                        <div className="text-center p-3 bg-gray-200 rounded-lg font-medium text-gray-600 flex items-center justify-center space-x-2">
                                            <XCircle size={20} className="text-red-500"/>
                                            <span>Metode pembayaran ini akan segera tersedia.</span>
                                        </div>
                                    )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                        </div>
                      ))}

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* CONFIRMATION BUTTON */}
          <button
            onClick={handleConfirmation}
            // Disabled jika form tidak valid ATAU belum ada metode pembayaran yang dipilih
            disabled={!isFormValid || !openMethod}
            className={`w-full p-4 mt-8 rounded-2xl text-white font-bold text-lg transition-all shadow-xl
              ${!isFormValid || !openMethod
                ? 'bg-gray-400 cursor-not-allowed shadow-inner'
                : 'bg-green-600 hover:bg-green-700 active:bg-green-800 transform hover:scale-[1.01]'
              }`}
          >
            Konfirmasi Pembayaran
          </button>

          {/* Helper text for disabled button */}
          {(!isFormValid || !openMethod) && (
            <p className="text-center text-sm mt-2 text-red-500 font-medium">
              Mohon lengkapi detail pelanggan dan pilih metode pembayaran untuk melanjutkan.
            </p>
          )}
        </>
      )}
    </div>
  );
}