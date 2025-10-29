import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Nếu chưa có token => quay lại trang giới thiệu
  if (!token) {
    alert("⚠️ Vui lòng đăng nhập để tiếp tục!");
    return <Navigate to="/" replace />;
  }

  // Nếu có token => cho phép hiển thị component bên trong
  return children;
};

export default ProtectedRoute;
