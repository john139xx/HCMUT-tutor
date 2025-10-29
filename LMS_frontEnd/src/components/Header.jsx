import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm py-4 px-8 flex justify-between items-center border-b">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer select-none"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_Bach_Khoa_HCMUT.svg"
          alt="Logo"
          className="w-10 h-10 bg-white rounded-full"
        />
        <span className="text-xl font-bold text-blue-700 tracking-wide">
          TUTOR
        </span>
      </div>

      {/* Nút Đăng nhập & Đăng ký */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 text-blue-700 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Đăng nhập
        </button>
        <button
          onClick={() => navigate("/register")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đăng ký
        </button>
      </div>
    </header>
  );
};

export default Header;
