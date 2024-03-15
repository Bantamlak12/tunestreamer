const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
