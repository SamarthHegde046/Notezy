// routes/contact.js
const express = require('express');
const { Resend } = require('resend');
const router = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/', async (req, res) => {
  const { email, message } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'Your App <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,            
      subject: 'New Contact Message',
      html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ message: 'Email failed to send' });
  }
});

module.exports = router;
