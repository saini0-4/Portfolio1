const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST /api/contact - Submit contact form
router.post('/', contactController.submitContactForm);

// GET /api/contact - Get all contact messages (optional, for admin)
router.get('/', contactController.getContactMessages);

module.exports = router;
