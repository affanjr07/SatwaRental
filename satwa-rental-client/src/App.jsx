import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Vehicles from "./pages/Vehicles.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Admin from "./pages/Admin.jsx";
import AddVehicle from "./pages/AddVehicle.jsx";
import EditVehicle from "./pages/EditVehicle.jsx";
import About from "./pages/About.jsx";
import Booking from "./pages/Booking.jsx";

import Nav from "./components/Nav.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/add"
            element={
              <PrivateRoute>
                <AddVehicle />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/edit/:id"
            element={
              <PrivateRoute>
                <EditVehicle />
              </PrivateRoute>
            }
          />

          {/* Booking Protected */}
          <Route
            path="/booking/:id"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
