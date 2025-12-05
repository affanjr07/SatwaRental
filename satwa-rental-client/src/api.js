const API = import.meta.env.VITE_API_URL;

export async function apiGet(path) {
  const token = localStorage.getItem("token");

  return fetch(`${API}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}
