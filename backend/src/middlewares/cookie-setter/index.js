module.exports = (config, { strapi }) => {
  return async function(ctx, next) {
    if (ctx.url.startsWith('/api/auth/local/registers')) {
      const token = ctx.cookies.get('authToken');
      if (token) {
        ctx.cookies.set('authToken', token, {
          httpOnly: true,
          secure: true,
          maxAge: 360000,
          sameSite: 'none',
          path: '/',
        });
      }
    }
    await next();
  };
};