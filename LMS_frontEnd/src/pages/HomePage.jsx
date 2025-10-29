import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBook, FaChalkboardTeacher, FaTools, FaSearch } from "react-icons/fa";

const HomePage = ({ setIsLoggedIn, setUserInfo }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate("/login");
    }
  }, [navigate]);

 const handleLogout = () => {
  // ✅ Xóa thông tin đăng nhập
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // ✅ Reset state nếu được truyền từ App.jsx
  if (typeof setIsLoggedIn === "function") setIsLoggedIn(false);
  if (typeof setUserInfo === "function") setUserInfo(null);

  // ✅ Điều hướng về trang giới thiệu (About Section)
  navigate("/");

  // ❌ Không reload lại trang nữa — giữ nguyên Router, Header/Footer không biến mất
};


  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* ============ Sidebar ============ */}
      <aside className="w-60 bg-blue-800 text-white flex flex-col py-6 px-4 space-y-6">
        <div className="flex items-center space-x-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_Bach_Khoa_HCMUT.svg"
            alt="Logo"
            className="w-10 h-10 bg-white rounded-full p-1"
          />
          <h1 className="text-xl font-bold tracking-wide">TUTOR</h1>
        </div>

        <nav className="flex flex-col space-y-4 mt-8">
          <button className="flex items-center gap-3 text-left hover:text-yellow-300 transition">
            <FaBook /> Thư viện
          </button>
          <button className="flex items-center gap-3 text-left text-yellow-300 font-semibold">
            <FaChalkboardTeacher /> Lớp học
          </button>
          <button className="flex items-center gap-3 text-left hover:text-yellow-300 transition">
            <FaTools /> Tùy chỉnh lớp học
          </button>
        </nav>
      </aside>

      {/* ============ Main Content ============ */}
      <main className="flex-1 flex flex-col">
        {/* ---------- Header ---------- */}
        <header className="bg-white shadow flex justify-between items-center px-8 py-4">
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <FaSearch /> Tìm kiếm
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/register-mentor")}
                 className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition"
 >
                     Đăng ký Mentor
                                    </button>
            <div className="flex items-center gap-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <div className="text-right">
                <p className="font-semibold text-gray-700">{user?.name}</p>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ---------- Body ---------- */}
        <section className="flex-1 overflow-y-auto p-8">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Lớp học hiện tại</h2>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Pháp luật
            </h3>

            {/* Example class */}
            <div className="space-y-4">
              <div className="border-b pb-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">
                    Giảng viên: Nguyễn Hữu Duy
                  </p>
                  <p className="text-gray-600 text-sm">Thứ: Thứ 6</p>
                  <p className="text-gray-600 text-sm">Tiết: 2-3</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Hình thức học: Trực tiếp</p>
                  <p className="text-sm">Địa điểm: Khách sạn Minh Anh</p>
                </div>
              </div>

              <div className="border-b pb-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">
                    Giảng viên: Nguyễn Hữu Duy
                  </p>
                  <p className="text-gray-600 text-sm">Thứ: Thứ 6</p>
                  <p className="text-gray-600 text-sm">Tiết: 2-3</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Hình thức học: Online</p>
                  <p className="text-sm">Địa điểm: None</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">
              Công nghệ phần mềm
            </h3>
            <p className="text-gray-600">Chưa có dữ liệu lớp học.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
