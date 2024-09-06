const { generateToken, verifyToken } = require("../../../utils/token");
const { checkDuplicate } = require("./check-duplicate-service");
const sendEmail = require("../config/email");

// Common function to generate and send email
const generateAndSend = async (user, subject, textContent, htmlContent, expiresIn = '1h') => {

  const token = generateToken({ id: user.id }, expiresIn);
  const textEmailContent = textContent.replace("{token}", token);
  const htmlEmailContent = htmlContent.replace("{token}", token);

  await sendEmail(user.email, subject, textEmailContent, htmlEmailContent);
};

// Function to register a new user
const registerUser = async (username, email, password, ctx) => {
  try {
    console.log('Request Headers:', ctx.request.headers);

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

    ctx.session.email = email;

    console.log('CTX:', ctx);
    console.log('CTX.SESSION:', ctx.session);
    console.log('CTX.SESSION.EMAIL:', ctx.session ? ctx.session.email : 'undefined');

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token={token}`;

    const textContent = `
    Welcome to our service! Please confirm your email by visiting the following link: ${verificationLink}
  `

    const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
    <img src="https://i.imgur.com/DR3r7ye.png" alt="verified" style="width: 100px; margin-top: 20px;" />
    <h1 style="color: #333;">Confirm Your Email</h1>
    <p style="color: #555;">Verifying your email gives you access to more features. <br /> Click the button below to confirm your email address.</p>
    <a href="${verificationLink}" style="display: inline-block; padding: 15px 25px; color: #fff; background-color: #3498db; border-radius: 5px; text-decoration: none;">Confirm Email</a>
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
  </style>
  `;

    // Use the generateAndSend function to send email with 24h expiration
    await generateAndSend(user, 'Email Verification', textContent, htmlContent, '24h');

    console.log('Response Headers (after):', ctx.response.headers);
  } catch (error) {
    console.error('An error occurred in registerUser:', error);
    throw error;
  }
};

// Function to resend confirmation email
const resendConfirmationEmail = async (ctx) => {
  const email = ctx.session.email;
  console.log('resend', email);
  if (!email) {
    throw new Error('No email found in session');
  }

  const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  if (user.confirmed) {
    throw new Error('This account is already confirmed');
  }

  const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token={token}`;

  const textContent = `
    Welcome to our service! Please confirm your email by visiting the following link: ${verificationLink}
  `

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; text-align: center; border: 1px solid #ddd; border-radius: 10px;">
    <img src="https://i.imgur.com/DR3r7ye.png" alt="verified" style="width: 100px; margin-top: 20px;" />
    <h1 style="color: #333;">Confirm Your Email</h1>
    <p style="color: #555;">Verifying your email gives you access to more features. <br /> Click the button below to confirm your email address.</p>
    <a href="${verificationLink}" style="display: inline-block; padding: 15px 25px; color: #fff; background-color: #3498db; border-radius: 5px; text-decoration: none;">Confirm Email</a>
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
  </style>
  `;

  await generateAndSend(user, 'Email Verification', textContent, htmlContent, '24h');
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