'use strict';

const { registerUser } = require('../services/email-service');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    try {
      await registerUser(username, email, password, ctx);
      ctx.send({ message: 'Registration successful, please check your email for verification.' });
    } catch (error) {
      ctx.badRequest(error.message);
    }
  }
};