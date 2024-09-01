const { generateToken, verifyToken } = require("../../../utils/token");
const { checkDuplicate } = require("./checkDuplicateService");
const sendEmail = require("../config/email");
const path = require("path");

// Common function to generate and send email
const generateAndSend = async (user, subject, htmlContent, expiresIn = '1h', attachments = []) => {
  const token = generateToken({ id: user.id }, expiresIn);
  const emailHtml = htmlContent.replace("{token}", token);
  await sendEmail(user.email, subject, emailHtml, attachments);
};

// Function to image attachment
const preImageAttachment = (filename, cid) => {
  return {
    filename: filename,
    path: path.resolve(process.cwd(), 'public/uploads', filename),
    cid: cid
  };
};

// Function to register a new user
const registerUser = async (username, email, password) => {
  if (!username || !email || !password) {
    throw new Error('Missing username, email or password');
  }

  // Check if username and email already exists from checkDup
  await checkDuplicate(username, email);

  // Add the new user to the DB with confirmed set to false
  const user = await strapi.plugins['users-permissions'].services.user.add({
    username,
    email,
    password,
    provider: 'local',
    confirmed: false,
  });

  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token={token}`;
  const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
    <img src="cid:verifyEmail" alt="verified" style="width: 100px; margin-top: 20px;" />
    <h1 style="color: #333;">Confirm Your Email</h1>
    <p style="color: #555;">Verifying your email gives you access to more features. <br /> Click the button below to confirm your email address.</p>
    <a href="${verificationLink}" style="display: inline-block; padding: 15px 25px; color: #fff; background-color: #3498db; border-radius: 5px; text-decoration: none;">Confirm Email</a>
    <p style="color: #999; font-size: 12px; margin-top: 30px;">If you did not request this email, you can safely ignore it.</p>
  </div>
  `;

  const attachments = [
    preImageAttachment('verifyEmail.png', 'verifyEmail')
  ];

  // Use the generateAndSend function to send email with 24h expiration
  await generateAndSend(user, 'Email Verification', emailHtml, '24h', attachments);
};

// Function to resend confirmation email
const resendConfirmationEmail = async (email) => {
  const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.confirmed) {
    throw new Error('This account is already confirmed');
  }

  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token={token}`;
  const emailHtml = `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`;

  await generateAndSend(user, 'Email Verification', emailHtml, '24h');
};

// Function to request password reset
const requestPasswordReset = async (email) => {
  const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const resetLink = `${process.env.FRONTEND_URL}/verify-token?token={token}`;
  const emailHtml = `<p>To reset your password, click the link below:</p><a href="${resetLink}">Reset Password</a>`;

  await generateAndSend(user, 'Password Reset', emailHtml, '1h');
};

// Function to reset password using token
const resetPassword = async (token, newPassword) => {
  console.log('Token received:', token);
  const decoded = verifyToken(token);
  if (!decoded || typeof decoded === 'string') {
    throw new Error('Invalid or expired token');
  }

  const { id } = decoded;

  // Set the new password for the user
  const user = await strapi.plugins['users-permissions'].services.user.edit(id, {
    password: newPassword,
  });

  if (!user) {
    throw new Error('Error updating password')
  }

  return user;
}

module.exports = { registerUser, resendConfirmationEmail, requestPasswordReset, resetPassword };