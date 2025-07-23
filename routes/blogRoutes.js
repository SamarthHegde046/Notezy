const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// Get blog metrics
router.get("/:blogId/metrics", async (req, res) => {
  try {
    const { blogId } = req.params;

    // Get or create blog metrics
    const blog = await Blog.getOrCreateMetrics(blogId);

    res.json({
      likesCount: blog.likesCount,
      viewsCount: blog.viewsCount,
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Failed to fetch metrics" });
  }
});

// Like a blog
router.post("/:blogId/like", async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.getOrCreateMetrics(blogId);
    await blog.incrementLikes();

    res.json({
      likesCount: blog.likesCount,
      viewsCount: blog.viewsCount,
    });
  } catch (error) {
    console.error("Error liking blog:", error);
    res.status(500).json({ error: "Failed to like blog" });
  }
});

// Unlike a blog
router.post("/:blogId/unlike", async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.getOrCreateMetrics(blogId);
    await blog.decrementLikes();

    res.json({
      likesCount: blog.likesCount,
      viewsCount: blog.viewsCount,
    });
  } catch (error) {
    console.error("Error unliking blog:", error);
    res.status(500).json({ error: "Failed to unlike blog" });
  }
});

// Increment view count
router.post("/:blogId/view", async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.getOrCreateMetrics(blogId);
    await blog.incrementViews();

    res.json({
      likesCount: blog.likesCount,
      viewsCount: blog.viewsCount,
    });
  } catch (error) {
    console.error("Error incrementing views:", error);
    res.status(500).json({ error: "Failed to increment views" });
  }
});

// Get all blog metrics (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updatedAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;