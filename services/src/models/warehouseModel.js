const mongoose = require('mongoose');

/* warehouse schema */
const warehouseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    address: { type: String, required: true },
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

module.exports = mongoose.model('Warehouse', warehouseSchema);
