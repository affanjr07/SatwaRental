import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login({ email, password }) {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { ok: false, message: data.message };

      setUser(data.user);
      return { ok: true, user: data.user };
    } catch (error) {
      return { ok: false, message: "Server error" };
    }
  }

  async function register({ username, email, password }) {
    try {
      const res = await fetch("https://satwarental-backend.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { ok: false, message: data.message };

      return { ok: true };
    } catch (error) {
      return { ok: false, message: "Server error" };
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
