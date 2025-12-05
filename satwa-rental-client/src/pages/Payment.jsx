import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy } from "lucide-react";

import danaLogo from "../assets/payments/dana.png";
import gopayLogo from "../assets/payments/gopay.png";
import shopeeLogo from "../assets/payments/shopeepay.png";
import qrisLogo from "../assets/payments/qris.png";
import bcaLogo from "../assets/payments/bca.png";
import briLogo from "../assets/payments/bri.png";

export default function Payment() {
  const [openCategory, setOpenCategory] = useState(null);
  const [openMethod, setOpenMethod] = useState(null);
  const [copied, setCopied] = useState("");

  const paymentData = {
    ewallet: {
      label: "E-Wallet",
      methods: {
        dana: { label: "Dana", number: "0895-1234-5678", logo: danaLogo },
        gopay: { label: "GoPay", number: "0812-9876-5432", logo: gopayLogo },
        shopeepay: { label: "ShopeePay", number: "0857-4444-2222", logo: shopeeLogo },
        qris: { label: "QRIS", number: "SCAN QR", logo: qrisLogo },
      },
    },
    bank: {
      label: "Bank Transfer",
      methods: {
        bca: { label: "Bank BCA", number: "1234567890", logo: bcaLogo },
        bri: { label: "Bank BRI", number: "0900123456", logo: briLogo },
      },
    },
  };

  const copyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopied(key);

    setTimeout(() => setCopied(""), 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-5">
      <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Metode Pembayaran
      </h1>

      {Object.entries(paymentData).map(([key, cat]) => (
        <div key={key} className="mb-4">

          {/* CATEGORY BUTTON */}
          <button
            onClick={() =>
              setOpenCategory(openCategory === key ? null : key)
            }
            className="w-full bg-white shadow-lg border p-4 rounded-2xl font-semibold text-left hover:bg-gray-50 duration-200 flex justify-between items-center"
          >
            {cat.label}
            <span>{openCategory === key ? "▲" : "▼"}</span>
          </button>

          {/* CATEGORY DROPDOWN */}
          <AnimatePresence>
            {openCategory === key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 flex flex-col gap-3 pl-2">

                  {Object.entries(cat.methods).map(([methodKey, method]) => (
                    <div key={methodKey}>
                      
                      {/* METHOD BUTTON */}
                      <button
                        onClick={() =>
                          setOpenMethod(
                            openMethod === methodKey ? null : methodKey
                          )
                        }
                        className="w-full bg-white shadow-md hover:shadow-lg border rounded-xl p-3 flex items-center gap-3 duration-200"
                      >
                        <img src={method.logo} alt="" className="w-10 h-10 rounded-lg" />
                        <span className="font-medium">{method.label}</span>
                      </button>

                      {/* NUMBER DROPDOWN */}
                      <AnimatePresence>
                        {openMethod === methodKey && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-gray-50 border rounded-xl p-4 mt-2 shadow flex justify-between items-center">
                              <div>
                                <p className="text-sm text-gray-600">Nomor Pembayaran</p>

                                <p className="font-mono font-bold text-lg">
                                  {method.number}
                                </p>
                              </div>

                              <button
                                onClick={() => copyText(method.number, methodKey)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg flex items-center gap-2 duration-200"
                              >
                                {copied === methodKey ? (
                                  <Check size={18} />
                                ) : (
                                  <Copy size={18} />
                                )}
                                {copied === methodKey ? "Tersalin" : "Salin"}
                              </button>
                            </div>

                            {/* QR IMAGE FOR QRIS (OPTIONAL) */}
                            {method.label === "QRIS" && (
                              <div className="mt-3">
                                <img
                                  src={method.logo}
                                  alt="QRIS Code"
                                  className="w-40 mx-auto rounded-lg shadow"
                                />
                                <p className="text-center text-sm mt-2 text-gray-600">
                                  Scan untuk membayar via QRIS
                                </p>
                              </div>
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
