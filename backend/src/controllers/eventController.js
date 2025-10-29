// controllers/eventController.js
const Event = require('../models/Event');
const cloudinary = require('../config/cloudinary');

// Create an event and upload images (if provided)
exports.createEvent = async (req, res) => {
  try {
    const { name, date } = req.body;

    // Upload images if any
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(fileStr, { folder: 'events' });
        uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
      }
    }

    const event = await Event.create({ name, date, images: uploadedImages });
    res.status(201).json(event);
  } catch (err) {
    console.error('createEvent error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all events
exports.getEvents = async (_req, res) => {
  try {
    const events = await Event.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single event by id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an event (and optionally new images)
exports.updateEvent = async (req, res) => {
  try {
    const { name, date } = req.body;
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // If new files are uploaded, delete old images and upload new ones
    if (req.files && req.files.length > 0) {
      if (Array.isArray(event.images)) {
        for (const img of event.images) {
          if (img.public_id) {
            try { await cloudinary.uploader.destroy(img.public_id); } catch (_) {}
          }
        }
      }

      const uploadedImages = [];
      for (const file of req.files) {
        const fileStr = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const result = await cloudinary.uploader.upload(fileStr, { folder: 'events' });
        uploadedImages.push({ url: result.secure_url, public_id: result.public_id });
      }
      event.images = uploadedImages;
    }

    if (name) event.name = name;
    if (date) event.date = date;

    await event.save();
    res.status(200).json(event);
  } catch (err) {
    console.error('updateEvent error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Delete an event and its images from Cloudinary
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (Array.isArray(event.images)) {
      for (const img of event.images) {
        if (img.public_id) {
          try { await cloudinary.uploader.destroy(img.public_id); } catch (_) {}
        }
      }
    }
    await Event.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('deleteEvent error:', err);
    res.status(500).json({ error: err.message });
  }
};
