import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await login({ email, password });

    if (!res.ok) return alert(res.message);

    alert("Login berhasil!");

    if (res.user.role === "admin") nav("/admin");
    else nav("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Login Akun</h2>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2" required />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg">
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
