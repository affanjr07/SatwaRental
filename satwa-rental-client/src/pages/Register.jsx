import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Password tidak sama!");
      return;
    }

    setLoading(true);

    const res = await register({
      username: form.name,     // IMPORTANT: sesuaikan ke backend
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (!res.ok) {
      setMessage(res.message);
      return;
    }

    setMessage("Berhasil mendaftar!");

    setTimeout(() => navigate("/login"), 1000);
  }

  return (
    <div className="flex justify-center items-center py-16 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Daftar Akun</h1>

        {message && <p className="mb-4 text-center text-blue-600 font-semibold">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="font-medium">Nama Lengkap</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <div>
            <label className="font-medium">Konfirmasi Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required className="w-full border rounded-lg px-3 py-2 mt-1" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-semibold rounded-lg py-2">
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
        </p>

      </div>
    </div>
  );
}
