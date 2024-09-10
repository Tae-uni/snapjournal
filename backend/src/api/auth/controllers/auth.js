'use strict';

const { registerUser, sendVerificationEmail, resendVerificationEmail } = require('../services/email-service');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    try {
      const user = await registerUser(username, email, password);
      ctx.session.email = email;
      await sendVerificationEmail(user);
      ctx.send({ message: 'Registration successful, please check your email for verification.' });
    } catch (error) {
      ctx.badRequest(error.message);
    }
    console.log('Ctx register:', ctx);
    console.log('Server session:', ctx.session.email);
  },

  async resend(ctx) {
    const email = ctx.session.email;
    console.log('Ctx resend:', ctx);
    console.log('Email from session', email);
    if (!email) {
      return ctx.badRequest('No email found in session');
    }

    try {
      await resendVerificationEmail(email);
      ctx.send({ message: 'Confirmation email resent successfully.' });
    } catch (error) {
      ctx.badRequest('Error resending confirmation email: ' + error.message);
    }
  },
};