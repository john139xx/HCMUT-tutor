// controllers/noticeController.js
const Notice = require("../models/Notice");

// Create a new notice
exports.createNotice = async (req, res) => {
  try {
    const { title, deadline, pdfLink } = req.body;
    const notice = await Notice.create({ title, deadline, pdfLink });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notices
exports.getAllNotices = async (_req, res) => {
  try {
    const notices = await Notice.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(notices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a notice
exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, deadline, pdfLink } = req.body;

    const notice = await Notice.findByPk(id);
    if (!notice) return res.status(404).json({ error: 'Notice not found' });

    if (title !== undefined)    notice.title = title;
    if (deadline !== undefined) notice.deadline = deadline;
    if (pdfLink !== undefined)  notice.pdfLink = pdfLink;
    await notice.save();

    res.status(200).json(notice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a notice
exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Notice.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Notice not found' });
    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
