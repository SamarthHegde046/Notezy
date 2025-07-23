const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogId: { type: String, required: true, unique: true }, // Reference to local blog ID
  
  // Cloud-managed engagement metrics only
  likesCount: { type: Number, default: 0 },
  viewsCount: { type: Number, default: 0 },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
blogSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to increment likes
blogSchema.methods.incrementLikes = function() {
  this.likesCount += 1;
  return this.save();
};

// Method to decrement likes
blogSchema.methods.decrementLikes = function() {
  if (this.likesCount > 0) {
    this.likesCount -= 1;
  }
  return this.save();
};

// Method to increment views
blogSchema.methods.incrementViews = function() {
  this.viewsCount += 1;
  return this.save();
};

// Static method to get or create blog metrics
blogSchema.statics.getOrCreateMetrics = async function(blogId) {
  let blog = await this.findOne({ blogId });
  if (!blog) {
    blog = new this({ blogId });
    await blog.save();
  }
  return blog;
};

module.exports = mongoose.model("Blog", blogSchema);