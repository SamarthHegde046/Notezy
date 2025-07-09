const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  thumbnail: { type: String },
  author: { type: String, default: "Admin" },
  date: { type: Date, default: Date.now },
  tags: [String]
});

module.exports = mongoose.model("Blog", blogSchema);
