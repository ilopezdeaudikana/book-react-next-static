import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, message } = req.body;

    const msg = {
      to: process.env.SENDGRID_SENDER,
      from: process.env.SENDGRID_SENDER,
      subject: 'New Message from Contact Form',
      text: `From: ${email}\n\n${message}`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}