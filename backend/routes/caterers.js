const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Caterer Signup
router.post('/caterer-request', upload.single('licenseFile'), async (req, res) => {
  const { email, password, companyName } = req.body;
  const licenseFile = req.file;

  if (!email || !password || !companyName || !licenseFile) {
    return res.status(400).json({ error: 'All fields including license are required' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newCaterer = new User({
      email,
      password: hashedPassword,
      role: 'caterer',
      companyName,
      licenseFile: licenseFile.path,
      status: 'pending',
    });

    await newCaterer.save();
    return res.status(201).json({ message: 'Caterer request submitted successfully' });
  } catch (err) {
    console.error('Caterer request error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;