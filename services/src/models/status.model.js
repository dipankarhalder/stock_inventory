const mongoose = require('mongoose');

/* Status model schema */
const UserSchema = new mongoose.Schema(
  {
    supId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('User', UserSchema);
