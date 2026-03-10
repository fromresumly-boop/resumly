import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { toEmail, pdfBase64 } = req.body;

  if (!toEmail || !pdfBase64) {
    return res.status(400).json({ error: 'Missing toEmail or pdfBase64' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Resumly" <no-reply@resumely.com>',
      to: toEmail,
      subject: "Your Resume from Resumly",
      html: "<p>Hi! Your professionally crafted resume is attached.</p><p>Good luck with your job search!</p>",
      attachments: [
        {
          filename: "resume.pdf",
          content: Buffer.from(pdfBase64, "base64"),
          contentType: "application/pdf"
        }
      ]
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Nodemailer Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
