const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { role } = require('../constant');

const taxtypes = [role.taxesTypes.inclusive, role.taxesTypes.exclusive];
const mainStatus = [role.coreStatus.active, role.coreStatus.inactive];

/* Tax model schema */
const TaxSchema = new Schema(
  {
    taxName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    taxCode: {
      type: String,
      required: true,
      maxlength: 30,
    },
    taxType: {
      type: String,
      enum: taxtypes,
      default: role.taxesTypes.inclusive,
    },
    taxStatus: {
      type: String,
      enum: mainStatus,
      default: role.coreStatus.active,
    },
    taxPercentage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxlength: 255,
    },
    user: {
      _id: mongoose.Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      role: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Tax', TaxSchema);
