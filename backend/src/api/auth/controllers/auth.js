'use strict';

const { sanitize } = require('@strapi/utils');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    if (!username || !email || !password) {
      return ctx.badRequest('Missing username, email or password');
    }

    const emailExist = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });
    const usernameExist = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });

    if (emailExist && usernameExist) {
      return ctx.badRequest('Email and Username are already taken');
    }
    
    if (emailExist) {
      return ctx.badRequest('Email is already taken');
    }

    if (usernameExist) {
      return ctx.badRequest('Username is already taken');
    }

    const user = await strapi.plugins['users-permissions'].services.user.add({
      username,
      email,
      password,
    });

    const sanitizeUser = await sanitize.contentAPI.output(user, strapi.getModel('plugin::users-permissions.user'));

    ctx.send(sanitizeUser);
  },
};
