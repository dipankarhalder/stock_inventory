const mongoose = require('mongoose');

/* brand schema */
const brandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, uppercase: true, required: true },
    desc: { type: String },
    isActive: { type: Boolean, default: true },
    createBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Brand', brandSchema);
