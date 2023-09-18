const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // You need to import jwt for token generation
router.use(express.json())
const { registerValidation, loginValidation } = require('../validation'); // Import validation functions



// Registration route
router.post('/register', async (req, res) => {
  // Validate registration data before creating a user
  const { error } = registerValidation(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send('Email already exists');
  }

  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // If validation passes, create a user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  // Validate login data before attempting to log in
  const { error } = loginValidation(req.body);

if (error) {
    console.log('Validation error:', error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  // Checking if the user is already in the database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log('User not found');
    return res.status(400).send(`Email doesn't exist`);
  }

  // Check if the password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) {
    console.log('Invalid password');
    return res.status(400).send('Invalid password');
  }

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, token_secret);

  // Set the token in the response header and send a success message
  res.header('auth-token', token).status(200).send('Logged in successfully');
});


module.exports = router



