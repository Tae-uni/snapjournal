'use strict';

const { generateToken } = require('../../../utils/token');
const { registerUser, resendVerificationEmail } = require('../services/email-service');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    try {
      const user = await registerUser(username, email, password);

      const authToken = generateToken({ id: user.id }, '1h');
      console.log(authToken);

      ctx.set('Access-Control-Allow-Origin', 'https://localhost:3000');
      ctx.set('Access-Control-Allow-Credentials', true);

      // ctx.cookies.set('authToken', authToken, {
      //   httpOnly: false,
      //   secure: true,
      //   // secureProxy: true,
      //   maxAge: 3600000,
      //   sameSite: 'none',
      //   path: '/',
      //   // proxy: true,
      // });

      ctx.send({
        user,
        message: 'Registration successful, please check your email.',
        // token: authToken,
      });
    } catch (error) {
      ctx.badRequest(error.message);
    }
    console.log('Ctx register:', ctx);
  },

  async resend(ctx) {
    ctx.set('Access-Control-Allow-Origin', 'https://localhost:3000');
    ctx.set('Access-Control-Allow-Credentials', true);

    const token = ctx.cookies.get('authToken');
    // const token = ctx.request.header.authorization?.split(' ')[1];
    // if (!token) {
    //   return ctx.badRequest('No auth token found in cookies');
    // }
    if (token) {
      ctx.request.header.authorization = `Bearer ${token}`;
    }

    try {
      await resendVerificationEmail(token);

      ctx.send({ message: 'Confirmation email resent successfully.' });
    } catch (error) {
      ctx.badRequest('Error resending confirmation email: ' + error.message);
    }
  },
};