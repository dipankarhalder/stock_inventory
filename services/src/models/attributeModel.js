const mongoose = require('mongoose');

/* Attribute schema */
const attributeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, uppercase: true, required: true },
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

module.exports = mongoose.model('Attribute', attributeSchema);
