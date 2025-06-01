const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    categoryCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Category', CategorySchema);
