const express = require('express');
const router = express.Router();
const axios = require('axios');
const Visitor = require('../models/Visitor');

// Track a new visitor
router.post('/visit', async (req, res) => {
  try {
    const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;

    const existing = await Visitor.findOne({ ip });
    if (!existing) {
      // Get geolocation data from ipapi
      const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`);
      const { city, region, latitude, longitude } = geoRes.data;

      const visitor = new Visitor({
        ip,
        city,
        region,
        latitude,
        longitude
      });

      await visitor.save();
    }

    const total = await Visitor.countDocuments();

    res.json({
      success: true,
      message: 'Visit tracked successfully',
      totalVisitors: total
    });

  } catch (err) {
    console.error('Visitor tracking failed:', err.message);
    res.status(500).json({ success: false, message: 'Server error while tracking visitor' });
  }
});

// Get total visitor count
router.get('/visits', async (req, res) => {
  try {
    const count = await Visitor.countDocuments();
    res.json({ success: true, totalVisitors: count });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch visitor count' });
  }
});

module.exports = router;
