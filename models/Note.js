const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    description:{
      type:String,
      required:true
    },
    by:{
      type:String,
      default:"Admin",
    },
    fileUrl: {
      type: String,
      required: true
    },
    downloadCount: {
      type: Number,
      default: 0
    },
    previewCount: {
      type: Number,
      default: 0
    },
    sem: {
      type: String,
      required: true
    },
    department: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', noteSchema);
