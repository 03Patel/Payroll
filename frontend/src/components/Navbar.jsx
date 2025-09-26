import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold">
          PayrollApp
        </Link>

        {/* Navigation Links */}
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/salary" className="hover:underline">Salary Slips</Link>
            <Link to="/expense" className="hover:underline">Expenses</Link>

            {/* Admin-specific links */}
            {user.role === "admin" && (
              <Link to="/admin" className="hover:underline">Admin Panel</Link>
            )}

            <span className="ml-4 text-sm">Hi, {user.name || user.email}</span>
            <button
              onClick={handleLogout}
              className="ml-2 px-3 py-1 bg-red-500 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 transition">
              Login
            </Link>
            <Link to="/signup" className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 transition">
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
