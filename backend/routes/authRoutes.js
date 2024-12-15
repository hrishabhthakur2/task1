const express = require('express');
const { signup, login, forgotPassword, resetPassword } = require('../controllers/authController');
const router = express.Router();

// API Route Prefix (Optional but recommended)
const API_PREFIX = '/api/auth';

// Signup Route
router.post('/signup', signup);

// Login Route
router.post('/login', login);

// Forgot Password Route
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password', resetPassword);

module.exports = router;
