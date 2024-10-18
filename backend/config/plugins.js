module.exports = () => ({
  'users-permissions': {
    enabled: true,
    config: {
      jwtSecret: process.env.JWT_SECRET,
      jwt: {
        expiresIn: '7d',
      },
    },
  },
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
        accessToken: process.env.GMAIL_OAUTH_ACCESS_TOKEN,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
      },
    },
    settings: {
      defaultFrom: process.env.EMAIL_USER,
      defaultReplyTo: process.env.EMAIL_USER,
    },
  },
});