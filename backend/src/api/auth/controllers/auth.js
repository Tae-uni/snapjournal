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

      ctx.cookies.set('authToken', authToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
        sameSite: 'none',
      });

      console.log('authToken Cookie set with:', {
        httpOnly: true,
        secure: true,
        maxAge: 3600000,
        sameSite: 'none',
      });

      ctx.set('Access-Control-Allow-Origin', 'https://localhost:3000');
      ctx.set('Access-Control-Allow-Credentials', 'true');

      ctx.send({
        user,
        message: 'Registration successful, please check your email.'
      });
    } catch (error) {
      ctx.badRequest(error.message);
    }
    console.log('Ctx register:', ctx);
  },

  async resend(ctx) {
    ctx.set('Access-Control-Allow-Origin', 'https://localhost:3000');
    ctx.set('Access-Control-Allow-Credentials', 'true');

    const token = ctx.cookies.get('authToken');

    if (!token) {
      return ctx.badRequest('No auth token found in cookies');
    }

    try {
      await resendVerificationEmail(token);

      ctx.send({ message: 'Confirmation email resent successfully.' });
    } catch (error) {
      ctx.badRequest('Error resending confirmation email: ' + error.message);
    }
  },
};