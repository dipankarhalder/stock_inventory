const mongoose = require('mongoose');

/* mentioned roles */
const roles = ['super_admin', 'admin', 'staff'];

/* user schema */
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, minlength: 6, required: true, select: false },
    role: { type: String, required: true, default: roles[1] },
    profileImage: { type: String },
    refreshTokens: [
      {
        token: { type: String },
        device: { type: String },
        browser: { type: String },
        os: { type: String },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
