'use strict';

const { requestPasswordReset, resetPassword } = require("../services/email-service");
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

  async forgot(ctx) {
    console.log('forgot handler called');
    const { email } = ctx.request.body;

    try {
      await requestPasswordReset(email);
      ctx.send({ message: 'Password reset email sent' });
    } catch (error) {
      ctx.badRequest('Error sending password reset email');
    }
  },

  async expire(ctx) {
    const { token } = ctx.query;

    try {
      const decoded = verifyToken(token);
      if (!decoded || typeof decoded === 'string') {
        return ctx.badRequest('Invalid or expired token');
      }

      ctx.send({ message: 'Valid token' });
    } catch (error) {
      return ctx.badRequest('Invalid or expired token');
    }
  },

  async reset(ctx) {
    console.log('reset handler called');
    const { token, newPassword } = ctx.request.body;

    const decoded = verifyToken(token);
    if (!decoded || typeof decoded === 'string') {
      console.error('Invalid or expired token:', token);
      return ctx.badRequest('Invalid or expired token');
    }

    try {
      await resetPassword(token, newPassword);
      ctx.send({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Error resetting password:', error.message);
      ctx.badRequest('Error resetting password');
    }
  },
};