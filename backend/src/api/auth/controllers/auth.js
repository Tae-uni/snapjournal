'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    if (!username || !email || !password) {
      return ctx.badRequest('Missing username, email or password');
    }

    const userWithSameEmail = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });
    if (userWithSameEmail) {
      return ctx.badRequest('Email already taken');
    }
    
    const user = await strapi.plugins['user-permissions'].services.user.add({
      username,
      email,
      password,
    });

    const sanitizeUser = await sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));

    ctx.send(sanitizeUser);
  },
};
