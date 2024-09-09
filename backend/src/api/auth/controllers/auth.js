'use strict';

const { registerUser, sendVerificationEmail } = require('../services/email-service');

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
  },

  async resend(ctx) {
    const email = ctx.session.email;
    if (!email) {
      return ctx.badRequest('No email found in session');
    }

    try {
      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });
      if (!user || user.confirmed) {
        return ctx.badRequest('User not found or already confirmed');
      }

      await sendVerificationEmail(user);
      ctx.send({ message: 'Confirmation email resent successfully.' });
    } catch (error) {
      ctx.badRequest('Error resending confirmation email');
    }
  },
};