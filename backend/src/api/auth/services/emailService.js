const { generateToken, verifyToken } = require("../../../utils/token");
const sendEmail = require("../config/email");
const { checkDuplicate } = require("./checkDuplicateService");

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
  const token = generateToken({ id: user.id }, '1h');
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const emailHtml = `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`;

  // Send the verification email
  await sendEmail(email, 'Email Verification', emailHtml);
};

const verifyEmailToken = async (token) => {
  const decoded = verifyToken(token);
  if (!decoded || typeof decoded === 'string') {
    throw new Error('Invalid or expired token');
  }

  // Extract the user ID from the token
  const { id } = decoded;

  // Set the user's confirmed status to true
  const user = await strapi.plugins['users-permissions'].services.user.edit(id, {
    confirmed: true,
  });

  return user;
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

  const token = generateToken({ id: user.id }, '1h');
  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const emailHtml = `<p>Please verify your email by clicking the link below:</p><a href="${verificationLink}">Verify Email</a>`;

  await sendEmail(email, 'Email Verification', emailHtml);
};

// Function to request password reset
const requestPasswordReset = async (email) => {
  const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const token = generateToken({ id: user.id }, '1h');
  const resetLink = `${process.env.FRONTEND_URL}/password/reset?token=${token}`;
  const emailHtml = `<p>To reset your password, click the link below:</p><a href="${resetLink}">Reset Password</a>`;

  await sendEmail(email, 'Password Reset', emailHtml);
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

module.exports = { registerUser, verifyEmailToken, resendConfirmationEmail, requestPasswordReset, resetPassword };