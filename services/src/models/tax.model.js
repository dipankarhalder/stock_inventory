const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taxtypes = ['exclusive', 'inclusive'];
const taxstatuses = ['active', 'inactive'];

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
      default: 'inclusive',
    },
    taxStatus: {
      type: String,
      enum: taxstatuses,
      default: 'active',
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
