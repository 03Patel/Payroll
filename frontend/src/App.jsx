import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Singup";
import Dashboard from "./pages/Dashboard";
import SalarySlips from "./pages/SalarySlips";
import Expenses from "./pages/Expenses";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Default route = Dashboard */}
       <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/salary"
          element={
            <ProtectedRoute>
              <SalarySlips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div className="p-6">404 Not Found</div>} />
      </Routes>
    </div>
  );
}
