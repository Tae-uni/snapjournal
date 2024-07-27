'use strict';

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
};