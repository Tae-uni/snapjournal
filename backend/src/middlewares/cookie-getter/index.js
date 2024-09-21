module.exports = (strapi) => {
  return {
    initialize() {
      strapi.app.use(async (ctx, next) => {
        if (ctx.url.startWith('/api/auth/local/resend-confirmation')) {
          const token = ctx.cookies.get('authToken');
          if (token) {
            ctx.request.header.authorization = `Bearer ${token}`;
          }
        }
        await next();
      });
    },
  };
};