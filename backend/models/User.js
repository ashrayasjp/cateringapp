const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['customer', 'caterer'] },
  username: { type: String },
  companyName: { type: String },
  licenseFile: { type: String },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
});

module.exports = mongoose.model('User', userSchema);

