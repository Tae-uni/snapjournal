// Handles sending emails during user authentication processes
const nodemailer = require('nodemailer');
const axios = require('axios');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, html, imageUrl = null, cid = 'defaultImageCid') => {
  let attachments = [];

  if (imageUrl) {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    // Add the image to attachments
    attachments.push({
      content: imageBuffer,
      cid: cid,
      contentType: 'image/png',
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments: attachments.length > 0 ? attachments : undefined, // Attachments are optional.
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email: ', error);
  }
};

module.exports = sendEmail;