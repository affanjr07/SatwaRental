const API = import.meta.env.VITE_API_URL;

// ...
const loadVehicles = async () => {
  const res = await fetch(`${API}/api/vehicles`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  // ...
};

// SAVE / UPDATE
const endpoint = form.id
  ? `${API}/api/vehicles/${form.id}`
  : `${API}/api/vehicles`;

// DELETE
await fetch(`${API}/api/vehicles/${id}`, {
  method: "DELETE",
  headers: { Authorization: `Bearer ${token}` },
});

export default Admin;

