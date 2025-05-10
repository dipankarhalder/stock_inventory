const mongoose = require('mongoose');

/* Supplier model schema */
const SupplierSchema = new mongoose.Schema(
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
    company: {
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

module.exports = mongoose.model('Supplier', SupplierSchema);
