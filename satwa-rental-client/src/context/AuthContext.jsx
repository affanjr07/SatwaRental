import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// akun default (admin & user)
const hardcoded = [
  { email: "admin", password: "admin123", role: "admin", username: "Admin" },
  { email: "user", password: "user123", role: "user", username: "User" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ambil user login + semua user dari localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("satwa_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // ambil daftar user tersimpan dari localStorage
  const getRegisteredUsers = () => {
    const saved = localStorage.getItem("satwa_users");
    return saved ? JSON.parse(saved) : [];
  };

  // REGISTER ► simpan user baru
  const register = ({ username, email, password }) => {
    const existing = getRegisteredUsers();

    // cek jika email sudah dipakai
    if (existing.find(u => u.email === email)) {
      return { ok: false, message: "Email sudah terdaftar." };
    }

    const newUser = { username, email, password, role: "user" };

    const updatedUsers = [...existing, newUser];

    localStorage.setItem("satwa_users", JSON.stringify(updatedUsers));

    return { ok: true, message: "Pendaftaran berhasil!" };
  };

  // LOGIN ► cek admin/user hardcoded + user register
  const login = ({ email, password }) => {
    // check registered users first
    const registered = getRegisteredUsers();
    const regUser = registered.find(
      u => u.email === email && u.password === password
    );

    if (regUser) {
      const payload = {
        email: regUser.email,
        role: regUser.role,
        username: regUser.username,
      };
      setUser(payload);
      localStorage.setItem("satwa_user", JSON.stringify(payload));
      return { ok: true, user: payload };
    }

    // fallback check hardcoded admin + default user
    const hard = hardcoded.find(
      x => x.email === email && x.password === password
    );

    if (!hard) {
      return { ok: false, message: "Email atau password salah" };
    }

    const payload = {
      email: hard.email,
      role: hard.role,
      username: hard.username,
    };

    setUser(payload);
    localStorage.setItem("satwa_user", JSON.stringify(payload));

    return { ok: true, user: payload };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("satwa_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
