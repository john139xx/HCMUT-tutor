const MentorRequest = require("../models/MentorRequest");
const User = require("../models/User");

// Người dùng gửi yêu cầu
exports.registerMentor = async (req, res) => {
  try {
    const { userId, expertise, experience, description } = req.body;
    const existing = await MentorRequest.findOne({ where: { userId } });

    if (existing) {
      return res.status(400).json({ message: "Bạn đã gửi yêu cầu trước đó!" });
    }

    const request = await MentorRequest.create({
      userId,
      expertise,
      experience,
      description,
      status: "pending",
    });

    res.status(201).json({ message: "Yêu cầu đã được gửi", request });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Admin xem danh sách
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await MentorRequest.findAll();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Duyệt yêu cầu
exports.approveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await MentorRequest.findByPk(id);
    if (!request) return res.status(404).json({ message: "Không tìm thấy yêu cầu" });

    request.status = "approved";
    await request.save();

    res.status(200).json({ message: "Đã duyệt yêu cầu", request });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Từ chối yêu cầu
exports.rejectRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await MentorRequest.findByPk(id);
    if (!request) return res.status(404).json({ message: "Không tìm thấy yêu cầu" });

    request.status = "rejected";
    await request.save();

    res.status(200).json({ message: "Đã từ chối yêu cầu", request });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};
