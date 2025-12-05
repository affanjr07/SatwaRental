import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditVehicle() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => setForm(data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    window.location.href = "/admin";
  }

  if (!form.id) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Edit Vehicle</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name || ""} className="border p-2 w-full" onChange={handleChange} />
        <input name="type" value={form.type || ""} className="border p-2 w-full" onChange={handleChange} />
        <input name="price_per_day" value={form.price_per_day || ""} className="border p-2 w-full" onChange={handleChange} />
        <input name="image_url" value={form.image_url || ""} className="border p-2 w-full" onChange={handleChange} />

        <button className="bg-blue-500 px-4 py-2 text-white rounded">Save</button>
      </form>
    </div>
  );
}
