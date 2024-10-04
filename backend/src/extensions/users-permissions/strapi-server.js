module.exports = (plugin) => {
  // Original register function from the Strapi plugin
  const originRegister = plugin.controllers.auth.register;

  // Override the original register function
  plugin.controllers.auth.register = async (ctx) => {
    const { email, username } = ctx.request.body;
    console.log('Strapi info', email, username);

    // Get the user's info through the query
    const existingEmailUser = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email: email.toLowerCase() }
    });

    if (existingEmailUser) {
      return ctx.badRequest('Email already exists.');
    }

    await originRegister(ctx);
  };
  return plugin;
}