const mongoose = require('mongoose');

/* sub category schema */
const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, uppercase: true },
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

module.exports = mongoose.model('Subcategory', subCategorySchema);
