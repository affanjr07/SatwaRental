import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Admin() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchVehicles() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.msg || "Failed to fetch vehicles");

      setVehicles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this vehicle?")) return;

    const token = localStorage.getItem("token");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/vehicles/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert("Failed to delete");
      return;
    }

    fetchVehicles(); // refresh list
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <Link
        to="/admin/add"
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        + Add Vehicle
      </Link>

      <table className="w-full border mt-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Price/Day</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td className="border p-2 text-center">
                {v.image_url ? (
                  <img src={v.image_url} className="w-20 mx-auto" />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="border p-2">{v.name}</td>
              <td className="border p-2">{v.type}</td>
              <td className="border p-2">Rp {v.price_per_day}</td>
              <td className="border p-2 text-center">
                <Link
                  to={`/admin/edit/${v.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(v.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
