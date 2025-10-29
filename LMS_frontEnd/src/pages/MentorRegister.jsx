import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MentorRegister = () => {
  const [formData, setFormData] = useState({
    expertise: "",
    experience: "",
    description: "",
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!user || !token) {
        alert("Bạn cần đăng nhập trước khi đăng ký Mentor!");
        navigate("/login");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/mentors/register", {
        userId: user.id,
        expertise: formData.expertise,
        experience: formData.experience,
        description: formData.description,
      });

      setSuccess(true);
      alert("✅ Đã gửi yêu cầu Mentor! Vui lòng chờ admin duyệt.");
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("❌ Gửi yêu cầu thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 p-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-md p-8 border border-blue-100">
        <h1 className="text-3xl font-bold text-blue-700 text-center mb-6">
          Đăng ký Mentor
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-semibold text-gray-700">Lĩnh vực chuyên môn:</label>
            <input
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              placeholder="VD: Lập trình Web, Toán cao cấp..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Kinh nghiệm:</label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="VD: 2 năm giảng dạy tại BK"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="font-semibold text-gray-700">Mô tả bản thân:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Giới thiệu ngắn gọn về kỹ năng và kinh nghiệm của bạn"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default MentorRegister;
