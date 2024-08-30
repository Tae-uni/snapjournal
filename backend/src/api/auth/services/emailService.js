const { generateToken, verifyToken } = require("../../../utils/token");
const { checkDuplicate } = require("./checkDuplicateService");
const sendEmail = require("../config/email");

// Common function to generate and send email
const generateAndSend = async (user, subject, htmlContent, expiresIn = '1h') => {
  const token = generateToken({ id: user.id }, expiresIn);
  const emailHtml = htmlContent.replace("{token}", token);
  await sendEmail(user.email, subject, emailHtml);
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
  
  // Generate a verification token with a 1-hour expiration

  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token={token}`;
  const emailHtml = `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`;

  // Use the generateAndSend function to send email with 24h expiration
  await generateAndSend(user, 'Email Verification', emailHtml, '24h');
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