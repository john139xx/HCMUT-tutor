const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ========== REGISTER ==========
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // ⚙️ Cho phép bất kỳ email, hoặc bạn có thể bật lại nếu cần:
    // if (!email.endsWith("@hcmut.edu.vn")) {
    //   return res.status(400).json({ message: "Email phải thuộc miền @hcmut.edu.vn" });
    // }

    // ✅ Kiểm tra email trùng
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email đã được đăng ký!" });
    }

    // ✅ Lưu mật khẩu dạng thường
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Đăng ký thành công!",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// ========== LOGIN (dạng mật khẩu thường) ==========
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Tìm user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    }

    // ✅ So sánh trực tiếp (vì không dùng bcrypt)
    if (password !== user.password) {
      return res.status(400).json({ message: "Sai email hoặc mật khẩu" });
    }

    // ✅ Tạo token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET || "defaultsecret",
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
