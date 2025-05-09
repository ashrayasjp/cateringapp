const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Adjust this path based on your User model
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads (optional for customer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Set up your folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
  }
});
const upload = multer({ storage: storage });

// Route for customer sign-up
router.post('/customer-signup', upload.single('licenseFile'), async (req, res) => {
  try {
    // Destructure data from the request body
    const { email, password, additionalField } = req.body;
    
    // Check if customer already exists
    const existingCustomer = await User.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: 'Customer with this email already exists' });
    }

    // Hash password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer
    const newCustomer = new User({
      email,
      password: hashedPassword,
      username: additionalField, // Assuming additionalField is the customer's username
      role: 'customer',
    });

    // Save the customer to the database
    await newCustomer.save();

    // Return success response
    res.status(201).json({ message: 'Customer created successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
