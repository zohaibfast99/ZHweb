const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Email configuration
const { EMAIL_USER, EMAIL_PASS, CONTACT_TO } = process.env;

if (!EMAIL_USER || !EMAIL_PASS) {
  console.error('EMAIL_USER and EMAIL_PASS must be set (see .env.example)');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: EMAIL_USER, pass: EMAIL_PASS }
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
      to: CONTACT_TO || EMAIL_USER,
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

