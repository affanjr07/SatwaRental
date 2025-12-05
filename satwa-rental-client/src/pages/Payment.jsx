import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { qris_image } from "../assets/qris_image.png";

export default function Payment() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openMethod, setOpenMethod] = useState(null);
  const [copied, setCopied] = useState("");

  const paymentData = {
    ewallet: {
      label: "E-Wallet",
      methods: {
        dana: {
          label: "Dana",
          number: "081293735336",
          logo: "https://seeklogo.com/images/D/dana-logo-8601D8801B-seeklogo.com.png",
        },
        gopay: {
          label: "GoPay",
          number: "081293735336",
          logo: "https://seeklogo.com/images/G/gopay-logo-681C0C73E6-seeklogo.com.png",
        },
        shopeepay: {
          label: "ShopeePay",
          number: "081293735336",
          logo: "https://cdn.worldvectorlogo.com/logos/shopeepay-2.svg",
        },
        qris: {
          label: "QRIS",
          number: "SCAN QR",
          logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/QRIS_logo.svg/2560px-QRIS_logo.svg.png",
          qris_image:
            "qris_image",
        },
      },
    },

    bank: {
      label: "Bank Transfer",
      methods: {
        mandiri: {
          label: "Bank Mandiri",
          number: "1200012345678",
          logo: "https://seeklogo.com/images/B/bank-mandiri-logo-5FC3084148-seeklogo.com.png",
        },
        bca: {
          label: "Bank BCA",
          number: "1234567890",
          logo: "https://seeklogo.com/images/B/BCA-logo-99461D1F6F-seeklogo.com.png",
        },
        bri: {
          label: "Bank BRI",
          number: "0900123456",
          logo: "https://seeklogo.com/images/B/bri-bank-rakyat-indonesia-logo-40A62F66F0-seeklogo.com.png",
        },
      },
    },
  };

  const copyText = (text, key) => {
    if (text === "SCAN QR") return;
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 1400);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-4">

      {/* TITLE */}
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        Metode Pembayaran
      </h1>

      {/* Payment Categories */}
      {Object.entries(paymentData).map(([catKey, cat]) => (
        <div key={catKey} className="mb-5">

          {/* CATEGORY BUTTON */}
          <button
            onClick={() => setOpenCategory(openCategory === catKey ? null : catKey)}
            className="w-full bg-white p-5 rounded-2xl shadow-lg hover:shadow-xl duration-200 
                       flex justify-between items-center font-semibold border"
          >
            <span>{cat.label}</span>
            <span className="text-xl">{openCategory === catKey ? "▲" : "▼"}</span>
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
                <div className="mt-4 space-y-3">

                  {Object.entries(cat.methods).map(([methodKey, method]) => (
                    <div key={methodKey}>

                      {/* PAYMENT METHOD BUTTON */}
                      <button
                        onClick={() =>
                          setOpenMethod(openMethod === methodKey ? null : methodKey)
                        }
                        className="w-full flex items-center gap-4 bg-white shadow-md hover:shadow-lg 
                                   rounded-2xl border p-4 duration-200"
                      >
                        <img
                          src={method.logo}
                          className="w-12 h-12 rounded-xl object-contain"
                          alt={method.label}
                        />
                        <span className="font-medium text-lg">{method.label}</span>
                      </button>

                      {/* PAYMENT METHOD DROPDOWN */}
                      <AnimatePresence>
                        {openMethod === methodKey && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-gray-50 border rounded-2xl p-4 shadow-inner mt-2 flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-600">Nomor Pembayaran</p>
                                <p className="font-mono font-bold text-xl">{method.number}</p>
                              </div>

                              {method.number !== "SCAN QR" && (
                                <button
                                  onClick={() => copyText(method.number, methodKey)}
                                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl duration-200"
                                >
                                  {copied === methodKey ? <Check size={18} /> : <Copy size={18} />}
                                  {copied === methodKey ? "Tersalin" : "Salin"}
                                </button>
                              )}
                            </div>

                            {/* QRIS QR IMAGE */}
                            {method.label === "QRIS" && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-4"
                              >
                                <img
                                  src={method.qris_image}
                                  className="w-48 mx-auto shadow-md rounded-xl"
                                  alt="QRIS"
                                />
                                <p className="text-center text-sm mt-2 text-gray-600">
                                  Scan QR untuk melanjutkan pembayaran
                                </p>
                              </motion.div>
                            )}
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
    </div>
  );
}
