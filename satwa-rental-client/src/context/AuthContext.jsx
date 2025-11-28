import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const hardcoded = [
  { email: "admin", password: "admin123", role: "admin", username: "Admin" },
  { email: "user", password: "user123", role: "user", username: "User" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("satwa_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = ({ email, password }) => {
    const u = hardcoded.find(x => x.email === email && x.password === password);
    if (!u) return { ok: false, message: "Email atau password salah" };
    const payload = { email: u.email, role: u.role, username: u.username };
    setUser(payload);
    localStorage.setItem("satwa_user", JSON.stringify(payload));
    return { ok: true, user: payload };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("satwa_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
