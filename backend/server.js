// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import kết nối MySQL
const { connectDB, sequelize } = require("./src/config/db");

// Import models để Sequelize sync
require("./src/models/Admin");
require("./src/models/Event");
require("./src/models/Notice");

// Import routes
const userRoutes = require("./src/routes/userRoutes");
const noticeRoutes = require("./src/routes/noticeRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const authRoutes = require("./src/routes/authRoutes");
const mentorRoutes = require("./src/routes/mentorRoutes");

// ✅ Khởi tạo app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json()); // phải có dòng này để đọc body JSON từ frontend/Postman

// ✅ Kết nối MySQL
connectDB();

// ✅ Tự động đồng bộ bảng khi khởi chạy
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database & tables synced successfully!"))
  .catch((err) => console.error("❌ Database sync error:", err));

// ✅ Đăng ký routes
app.use("/api/mentors", mentorRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/auth", authRoutes);

// ✅ Middleware xử lý lỗi
app.use((err, req, res, next) => {
  console.error("⚠️ Error:", err.message);
  res.status(500).json({ error: err.message });
});

// ✅ Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
