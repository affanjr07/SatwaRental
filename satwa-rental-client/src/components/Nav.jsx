import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-600">
          <Link to="/">SatwaRental</Link>
        </h1>

        {/* Menu */}
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600">Beranda</Link>
          </li>
          <li>
            <Link to="/vehicles" className="hover:text-blue-600">Kendaraan</Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600">Tentang</Link>
          </li>
          <li>
            <Link to="/terms" className="hover:text-blue-600">Syarat & Ketentuan</Link>
          </li>

          {user ? (
            <>
              {/* admin panel */}
              {user.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-blue-600"
                  >
                    Admin
                  </Link>
                </li>
              )}

              {/* logout */}
              <li>
                <button
                  onClick={logout}
                  className="text-sm px-3 py-1 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            </li>
          )}

        </ul>
      </nav>
    </header>
  );
}
