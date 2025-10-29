import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer"; // nếu bạn có Footer
import Home from "./pages/Home";          // Trang giới thiệu (About Section)
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import MentorRegister from "./pages/MentorRegister";
function App() {
  const location = useLocation(); // ✅ Lấy đường dẫn hiện tại

  // ✅ Chỉ hiển thị Header và Footer nếu đang ở trang giới thiệu "/"
  const showHeaderFooter = location.pathname === "/";

  return (
    <>
      {showHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;
