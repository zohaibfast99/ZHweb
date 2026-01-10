const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'zh2technologies@gmail.com',
    pass: process.env.EMAIL_PASS || 'fwxk uttf jddh pfxx' // You'll need to set this as an environment variable or use App Password
  }
});

// Contact form endpoint - handle multipart/form-data
app.post('/forms/contact.php', upload.none(), async (req, res) => {
  try {
    // Handle form data (FormData from browser)
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    console.log('Received form data:', { name, email, subject, message });

    if (!name || !email || !subject || !message) {
      console.error('Missing required fields');
      return res.status(400).send('All fields are required');
    }

    // Email content
    const mailOptions = {
      from: `${email}`,
      to: 'zh2technologies@gmail.com',
      subject: `${subject}`,
      html: `
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return 'OK' as expected by the validate.js script
    res.send('OK');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending message. Please try again later.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  });

