import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import RequireRole from "./components/RequireRole";

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RequireRole roles={["admin"]}>
                <AdminDashboard />
              </RequireRole>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
