// controllers/notesController.js
const Note = require('../models/Note');
const Admin = require('../models/Admin');
const asyncHandler = require('express-async-handler');
const axios = require("axios");

//upload new note
const uploadNote = async (req, res) => {
  try {
    const { title, subject, description, by, sem, department, fileUrl } = req.body;

    if (!title || !subject || !description || !sem || !department || !fileUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const departments = Array.isArray(department) ? department : [department];

    const newNote = await Note.create({
      title,
      subject,
      sem,
      description,
      by,
      department: departments,
      fileUrl, 
    });

    res.status(201).json({
      message: 'Note link saved successfully!',
      note: newNote
    });
  } catch (error) {
    console.error('Save Link Error:', error);
    res.status(500).json({ message: 'Server error while saving note link' });
  }
};



const getDashboardData = asyncHandler(async (req, res) => {
  try {
    const currentAdmin = await Admin.findById(req.admin.id).select('name email')
    const notes = await Note.find().sort({ createdAt: -1 });
    const totalDownloads = notes.reduce((acc, note) => acc + (note.downloadCount||0),0);
    const totalPreviews = notes.reduce((acc, note) => acc + (note.previewCount || 0), 0);
    const totalDepartmentUploads = notes.reduce((acc, note) => acc + (note.department?.length || 0), 0);
    const activeAdmins = await Admin.find({ isActive: true }).select('_id email name lastLogin');
    const downloadsBySubject = {};

    notes.forEach(note => {
      const subject = note.subject?.toUpperCase(); 
      if (downloadsBySubject[subject]) {
        downloadsBySubject[subject] += note.downloads;
      } else {
        downloadsBySubject[subject] = note.downloads;
      }
    });
    
    const downloadsData = Object.entries(downloadsBySubject).map(([subject, count]) => ({
      subject,
      downloads: count
    }));
    const formattedAdmins = activeAdmins.map(admin => ({
      _id: admin._id,
      email: admin.email,
      name: admin.name,
      lastLogin: admin.lastLogin
        ? admin.lastLogin.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
        : 'Never',
    }));


    res.json({
      currentAdminName: currentAdmin.name,
      notes,
      totalDownloads,
      totalPreviews,
      totalDepartmentUploads,
      activeAdmins:formattedAdmins,
      downloadsPerSubject: downloadsData
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
});

const proxyDownload = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Extract Google Drive File ID
    const match = note.fileUrl.match(/[-\w]{25,}/);
    if (!match) return res.status(400).json({ message: "Invalid file URL" });

    const fileId = match[0];
    const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    // Stream the file from Drive
    const response = await axios({
      url: directDownloadUrl,
      method: "GET",
      responseType: "stream",
    });

    // Set headers for download
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${note.title.replace(/\s+/g, "_")}.pdf"`
    );
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the file to the client
    response.data.pipe(res);
  } catch (error) {
    console.error("Proxy download failed:", error);
    res.status(500).json({ message: "Download failed" });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const { department, sem, subject } = req.query;

    const query = {};

    if (department) query.department = { $regex: new RegExp(`^${department}$`, 'i') };
    if (sem) query.sem = { $regex: new RegExp(`^${sem}$`, 'i') };
    if (subject) query.subject = { $regex: new RegExp(`^${subject}$`, 'i') };

    const notes = await Note.find(query).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    console.error('Fetch notes error:', error);
    res.status(500).json({ message: 'Server error while fetching notes' });
  }
};


// Get single note
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch note' });
  }
};

// Increment download count
const incrementDownload = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ success: true, downloadCount: note.downloadCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update download count' });
  }
};
// Increment preview count
const incrementPreview = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { $inc: { previewCount: 1 } },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ success: true, previewCount: note.previewCount });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update preview count' });
  }
};

//delete notes
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted successfully from database' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Server error while deleting note' });
  }
};


module.exports = {
  uploadNote,
  proxyDownload,
  getAllNotes,
  getNoteById,
  incrementDownload,
  incrementPreview,
  getDashboardData,
  deleteNote,
};