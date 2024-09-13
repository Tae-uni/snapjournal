'use strict';

const { registerUser, resendVerificationEmail } = require('../services/email-service');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    try {
      const { user, token } = await registerUser(username, email, password);

      ctx.cookies.set('authToken', token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'none',
      });

      ctx.send({ 
        user,
        message: 'Registration successful, please check your email.'
      });
    } catch (error) {
      ctx.badRequest(error.message);
    }
    console.log('Ctx register:', ctx);
  },

  async resend(ctx) {
    const body = ctx.request.body || {};

    if (Object.keys(body).length === 0) {
      body.token = ctx.cookies.get('authToken');
    }

    if (!body.token) {
      return ctx.badRequest('No token found');
    }

    try {
      await resendVerificationEmail(body.token);
      ctx.send({ message: 'Confirmation email resent successfully.' });
    } catch (error) {
      ctx.badRequest('Error resending confirmation email: ' + error.message);
    }
  },
};