const mongoose = require('mongoose');

/* Supplier model schema */
const SupplierSchema = new mongoose.Schema(
  {
    supId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    user: {
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

module.exports = mongoose.model('Supplier', SupplierSchema);
