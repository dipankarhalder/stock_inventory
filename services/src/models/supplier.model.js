const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { role } = require('../constant');

const mainStatus = [role.coreStatus.active, role.coreStatus.inactive];

/* Supplier model schema */
const SupplierSchema = new Schema(
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
    status: {
      type: String,
      enum: mainStatus,
      default: role.coreStatus.active,
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
