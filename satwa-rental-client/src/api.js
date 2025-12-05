export async function apiGet(path) {
  const token = localStorage.getItem("token");

  return fetch(`http://localhost:5000${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
}
