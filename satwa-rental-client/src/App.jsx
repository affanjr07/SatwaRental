import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Nav from "./components/Nav";
import { AuthProvider } from "./context/AuthContext";
import Booking from "./pages/Booking";

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
          <Route path="/booking" element={<Booking/>} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}