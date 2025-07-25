// routes/noteRoutes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const {
  uploadNote,
  proxyDownload,
  getAllNotes,
  getNoteById,
  incrementDownload,
  incrementPreview,
  getDashboardData,
  deleteNote
} = require('../controllers/notesController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
// Public routes
router.get('/', getAllNotes);
router.get('/dashboard', protect, getDashboardData);
router.get('/subjects', async (req, res) => {
  const { department, sem } = req.query;

  if (!department || !sem) {
    return res.status(400).json({ message: 'Department and semester are required' });
  }

  try {
    const notes = await Note.find({
      department: { $regex: new RegExp(`^${department}$`, 'i') },
      sem: { $regex: new RegExp(`^${sem}$`, 'i') }
    }).select('subject');

    const uniqueSubjects = [...new Set(notes.map(note => note.subject))];
    res.json(uniqueSubjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ message: 'Server error fetching subjects' });
  }
});

router.get('/:id', getNoteById);
router.put('/:id/increment', incrementDownload);
router.put('/:id/preview', incrementPreview);
router.get("/:id/download", proxyDownload);
router.delete('/:id', protect, deleteNote);

// Protected route (admin only)
router.post('/', protect, upload.single('file'), uploadNote);

module.exports = router;
