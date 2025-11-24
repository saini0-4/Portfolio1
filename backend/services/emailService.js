const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // Configure based on environment variables
  // For Gmail, you'll need to use an App Password
  // For other services, adjust accordingly
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const sendContactNotification = async ({ name, email, message }) => {
  // Only send if email is enabled and configured
  if (process.env.EMAIL_ENABLED !== 'true') {
    console.log('Email notifications are disabled');
    return;
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email credentials not configured');
    return;
  }

  try {
    const transporter = createTransporter();
    const recipientEmail = process.env.RECIPIENT_EMAIL || process.env.EMAIL_USER;

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from your portfolio contact form</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Send auto-reply to the person who submitted the form
const sendAutoReply = async (recipientEmail, recipientName) => {
  if (process.env.EMAIL_ENABLED !== 'true' || !process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    return;
  }

  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"Saini Bhatt" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: 'Thank you for reaching out!',
      html: `
        <h2>Thank you for your message, ${recipientName}!</h2>
        <p>I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Saini Bhatt</p>
      `,
      text: `Thank you for your message, ${recipientName}!\n\nI've received your message and will get back to you as soon as possible.\n\nBest regards,\nSaini Bhatt`
    };

    await transporter.sendMail(mailOptions);
    console.log('Auto-reply sent to:', recipientEmail);
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    // Don't throw - auto-reply failure shouldn't fail the main request
  }
};

module.exports = {
  sendContactNotification,
  sendAutoReply
};
