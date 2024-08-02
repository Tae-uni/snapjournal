'use strict';

const { resendConfirmationEmail, requestPasswordReset, resetPassword } = require("../services/emailService");
const { verifyToken } = require("../../../utils/token");

module.exports = {
  async verify(ctx) {
    console.log('verifyEmail handler called');
    const { token } = ctx.query;

    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded);

    if (!decoded || typeof decoded === 'string') {
      console.error('Invalid or expired token:', token)
      return ctx.badRequest('Invalid or expired token');
    }

    const { id } = decoded;

    try {
      const user = await strapi.plugins['users-permissions'].services.user.edit(id, {
        confirmed: true,
      });
      
      ctx.send({ message: 'Email verified successfully', user });
    } catch (error) {
      console.error('Error creating user:', error.message);
      ctx.badRequest('Error creating user');
    }
  },

  async resend(ctx) {
    const { email } = ctx.request.body;

    try {
      await resendConfirmationEmail(email);
      ctx.send({ message: 'Confirmation email resent successfully.' });
    } catch (error) {
      console.error('Error resending confirmation email:', error.message);
      ctx.badRequest('Error resending confirmation email');
    }
  },

  async forgotPassword(ctx) {
    const { email } = ctx.request.body;

    try {
      await requestPasswordReset(email);
      ctx.send({ message: 'Password reset email sent' });
    } catch (error) {
      ctx.badRequest('Error sending password reset email');
    }
  },

  async resetPassword(ctx) {
    const { token, newPassword } = ctx.request.body;

    try {
      await resetPassword(token, newPassword);
      ctx.send({ message: 'Password reset successfully' });
    } catch (error) {
      ctx.badRequest('Error resetting password');
    }
  },
};