module.exports = {
  provider: 'nodemailer',
  providerOptions: {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  settings: {
    defaultFrom: process.env.EMAIL_USER,
    defaultReplyTo: process.env.EMAIL_USER,
  },
};