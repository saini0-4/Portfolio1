const Contact = require('../models/Contact');
const emailService = require('../services/emailService');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and message'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Save contact message
    const contactMessage = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date()
    });

    // Send email notification (optional - only if email is configured)
    if (process.env.EMAIL_ENABLED === 'true') {
      try {
        await emailService.sendContactNotification({
          name,
          email,
          message
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Don't fail the request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! I\'ll get back to you soon.',
      data: {
        id: contactMessage.id,
        name: contactMessage.name,
        email: contactMessage.email
      }
    });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit your message. Please try again later.'
    });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    // Optional: Add authentication middleware here
    const messages = await Contact.getAll();
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Get contact messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages'
    });
  }
};
