// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// @desc    Create new feedback
// @route   POST /api/feedback
// @access  Public
router.post('/feedback', async (req, res) => {
  try {
    const { name, college, message, sem, department, subject } = req.body;

    // Validation
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name and message are required fields'
      });
    }

    // Create feedback
    const feedback = new Feedback({
      name,
      college: college || '',
      message,
      sem: sem || '',
      department: department || '',
      subject: subject || ''
    });

    const savedFeedback = await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      data: savedFeedback
    });

  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while submitting feedback',
      error: error.message
    });
  }
});

// @desc    Get all feedback (for admin)
// @route   GET /api/feedback
// @access  Public (you might want to add authentication)
router.get('/feedback', async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;
    
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = {};
    
    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const feedback = await Feedback.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Feedback.countDocuments(query);

    res.json({
      success: true,
      data: feedback,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalItems: total,
        itemsPerPage: limitNum
      }
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching feedback',
      error: error.message
    });
  }
});

// @desc    Get feedback by ID
// @route   GET /api/feedback/:id
// @access  Public (you might want to add authentication)
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      data: feedback
    });

  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching feedback',
      error: error.message
    });
  }
});
// @desc    Delete feedback
// @route   DELETE /api/feedback/:id
// @access  Public (you might want to add authentication)
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting feedback',
      error: error.message
    });
  }
});

// @desc    Get feedback statistics
// @route   GET /api/feedback/stats
// @access  Public (you might want to add authentication)
router.get('/admin/stats', async (req, res) => {
  try {
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalFeedback = await Feedback.countDocuments();
    
    // Get feedback by department
    const departmentStats = await Feedback.aggregate([
      {
        $match: { department: { $ne: '' } }
      },
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        total: totalFeedback,
        byStatus: stats,
        byDepartment: departmentStats
      }
    });

  } catch (error) {
    console.error('Error fetching feedback stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching feedback statistics',
      error: error.message
    });
  }
});

module.exports = router;