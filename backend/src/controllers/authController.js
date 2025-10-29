// controllers/authController.js
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// =================== REGISTER ===================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Kiểm tra đủ dữ liệu chưa
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    // Kiểm tra định dạng email HCMUT
    if (!email.endsWith("@hcmut.edu.vn")) {
      return res.status(400).json({ message: "Email phải thuộc miền @hcmut.edu.vn" });
    }

    // Kiểm tra email trùng
    const existing = await Admin.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email đã được đăng ký trước đó" });
    }

    // Tạo admin mới
    const admin = await Admin.create({
      adminNumber: name, // dùng name làm mã adminNumber cho đơn giản
      email,
      password,
    });

    // Trả kết quả thành công
    return res.status(201).json({
      message: "Đăng ký thành công!",
      admin: {
        id: admin.id,
        adminNumber: admin.adminNumber,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// =================== LOGIN ===================
exports.login = async (req, res) => {
  const { adminNumber, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { adminNumber } });
    if (!admin) return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const ok = await admin.comparePassword(password);
    if (!ok) return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      admin: { id: admin.id, adminNumber: admin.adminNumber, email: admin.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// =================== FORGOT PASSWORD ===================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

function genTempPassword(len = 10) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789@#$!';
  return Array(len).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
}

exports.forgotPassword = async (req, res) => {
  const { adminNumber } = req.body;
  if (!adminNumber) return res.status(400).json({ message: 'Vui lòng nhập mã admin' });

  try {
    const admin = await Admin.findOne({ where: { adminNumber } });
    if (!admin) return res.status(404).json({ message: 'Không tìm thấy admin' });

    // Tạo mật khẩu tạm thời
    const tempPass = genTempPassword(10);
    admin.password = tempPass;
    await admin.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: 'Khôi phục mật khẩu',
      text: `Mật khẩu tạm thời của bạn là: ${tempPass}\nVui lòng đăng nhập và đổi mật khẩu ngay.`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Đã gửi mật khẩu tạm thời đến email của bạn' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Lỗi khi gửi email: ' + error.message });
  }
};
