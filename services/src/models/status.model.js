const mongoose = require('mongoose');

/* Status model schema */
const StatusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 255,
    },
    user: {
      _id: mongoose.Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      role: String,
    },
    lastEditedBy: {
      _id: mongoose.Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      role: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Status', StatusSchema);
