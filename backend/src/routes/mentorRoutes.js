const express = require("express");
const router = express.Router();
const {
  registerMentor,
  getAllRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/mentorController");

// Người dùng gửi yêu cầu
router.post("/register", registerMentor);

// Admin xem danh sách yêu cầu
router.get("/requests", getAllRequests);

// Admin duyệt hoặc từ chối
router.put("/approve/:id", approveRequest);
router.put("/reject/:id", rejectRequest);

module.exports = router;
