module.exports = {
  async register(ctx) {
    const pluginStore = await strapi.store({ type: 'plugin', name: 'users-permissions' });
    const settings = await pluginStore.get({ key: 'advanced' }) || { allow_register: false };

    if (!settings.allow_register) {
      return ctx.badRequest('Register action is currently disabled');
    }

    const { email, username, password } = ctx.request.body;
    console.log('Hi this is register');
    // 이메일 중복 체크
    const existingEmail = await strapi.query('plugin::users-permissions.user').findOne({ where: { email } });
    if (existingEmail) {
      return ctx.badRequest('Email already exists');
    }

    // 유저네임 중복 체크
    const existingUsername = await strapi.query('plugin::users-permissions.user').findOne({ where: { username } });
    if (existingUsername) {
      return ctx.badRequest('Username already exists');
    }

    // 새로운 유저 생성
    const newUser = {
      email: email.toLowerCase(),
      username,
      password,
      role: settings.default_role,
      provider: 'local',
      confirmed: !settings.email_confirmation,
    };

    const user = await strapi.plugins['users-permissions'].services.user.add(newUser);

    // 이메일 확인 설정 여부에 따라 처리
    if (settings.email_confirmation) {
      await strapi.plugins['users-permissions'].services.user.sendConfirmationEmail(user);
      return ctx.send({ message: 'Confirmation email sent.' });
    }

    // JWT 발급
    const jwt = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });
    return ctx.send({
      jwt,
      user: await strapi.plugins['users-permissions'].services.user.sanitizeUser(user),
    });
  }
};