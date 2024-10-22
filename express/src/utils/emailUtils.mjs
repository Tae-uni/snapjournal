import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
  },
});

// console.log(
//   process.env.EMAIL_USER,
//   process.env.EMAIL_CLIENT_ID,
//   process.env.EMAIL_CLIENT_SECRET,
// )

export const sendEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.PROJECT_EMAIL,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const htmlContent =
    `<div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
    <img src="https://i.imgur.com/DR3r7ye.png" alt="verified" style="width: 100px; margin-top: 20px;" />
    <h1 style="color: #333;">Confirm Your Email</h1>
    <p style="color: #555;">Verifying your email gives you access to more features. <br /> Click the button below to confirm your email address.</p>
    <a href="${verificationUrl}" style="display: inline-block; padding: 15px 25px; color: #fff; background-color: #3498db; border-radius: 5px; text-decoration: none;">Confirm Email</a>
    <p style="color: #999; font-size: 12px; margin-top: 30px;">If you did not request this email, you can safely ignore it.</p>
  </div>
  <style>
    @media only screen and (max-width: 600px) {
      div {
        padding: 10px;
      }
      img {
        width: 80px;
      }
      h1 {
        font-size: 22px;
      }
      p {
        font-size: 14px;
      }
      a {
        padding: 10px 20px;
      }
    }
  </style>`;
  await sendEmail(email, 'Email Verification', htmlContent);
};