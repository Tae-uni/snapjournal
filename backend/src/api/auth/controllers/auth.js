'use strict';

const { registerUser, verifyEmailToken } = require('../services/emailService');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    try {
      await registerUser(username, email, password);
      ctx.send({ message: 'Registration successful, please check your email for verification.' });
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },

  async verifyEmail(ctx) {
    const { token } = ctx.request.query;

    try {
      const user = await verifyEmailToken(token);
      ctx.send({ message: 'Email verification successful', user });
    } catch (error) {
      ctx.badRequest(error.message);
    }
  },
};