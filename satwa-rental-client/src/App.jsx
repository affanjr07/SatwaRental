import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Nav from "./components/Nav";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking" element={<div className="p-6">Booking Page</div>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}