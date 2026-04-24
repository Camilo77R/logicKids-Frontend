import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Principal from "../pages/Principal";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* Redirigir de / a /Principal */}
        <Route path="/" element={<Navigate to="/Principal" replace />} />
        <Route path="/Principal" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}