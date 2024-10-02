module.exports = (plugin) => {
  plugin.controllers.auth.register = async (ctx) => {
    const { email, username } = ctx.request.body;
    console.log('Strapi info', email, username);
    await strapi.plugins['users-permissions'].controllers.auth.register(ctx);

    //   try {
    //     const existingUser = await strapi.query('plugin::users-permissions.user').findOne({
    //       where: {
    //         $or: [{ email }, { username }],
    //       },
    //     });

    //     if (existingUser) {
    //       if (existingUser.email === email) {
    //         return ctx.badRequest('Email is already taken');
    //       } else if (existingUser.username === username) {
    //         return ctx.badRequest('Email or username are already taken');
    //       }
    //     }

    //     await strapi.plugins['users-permissions'].controllers.auth.register(ctx);

    //   } catch (error) {
    //     console.error('Error during registration', error);
    //     return ctx.badRequest('Registration failed due to server error');
    //   }
    // };

  };
  return plugin;
}