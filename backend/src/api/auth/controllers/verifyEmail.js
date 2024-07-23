const { verifyToken } = require("../../../utils/token");

module.exports = {
  async verify(ctx) {
    const { token } = ctx.query;

    const decoded = verifyToken(token);

    if (!decoded || typeof decoded === 'string') {
      return ctx.badRequest('Invalid or expired token');
    }

    const { username, email, password } = decoded;

    const user = await strapi.query('plugin::users-permissions.user').create({
      data: {
        username: decoded.username,
        email: decoded.email,
        password: decoded.password,
        confirmed: true,
      },
    });

    ctx.send({ message: 'Email verified successfully', user });
  },
};