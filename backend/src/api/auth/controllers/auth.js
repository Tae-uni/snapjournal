'use strict';

const { generateToken } = require('../../../utils/token');
const { registerUser, resendVerificationEmail } = require('../services/email-service');

module.exports = {
  async register(ctx) {
    const { username, email, password } = ctx.request.body;

    try {
      const user = await registerUser(username, email, password);

      const authToken = generateToken({ id: user.id }, '1h');
      console.log('authToken',authToken);

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

      // const cookieValue = ctx.cookies.get('authToken');
      // console.log('cookies:', cookieValue);

      ctx.send({
        user,
        message: 'Registration successful, please check your email.',
        token: authToken,
      });
    } catch (error) {
      ctx.badRequest(error.message);
    }
    console.log('Ctx register:', ctx);
  },

  async resend(ctx) {
    console.log('Hi this is resend logic');
    ctx.set('Access-Control-Allow-Origin', 'https://localhost:3000');
    ctx.set('Access-Control-Allow-Credentials', true);

    console.log('Headers:', ctx.request.headers);
    console.log('Hi this is resend logic');

    const token = ctx.request.headers.authorization?.split('')[2];
    console.log('Successfully get the token',token);
    if (!token) {
      return ctx.badRequest('No auth token found in headers');
    }

    try {
      await resendVerificationEmail(token);
      ctx.send({ message: 'Confirmation email resent successfully.' });
    } catch (error) {
      ctx.badRequest('Error resending confirmation email: ' + error.message);
    }
  },
};