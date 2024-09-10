module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enable: true,
      origin: ['https://localhost:3000', 'https://localhost:1337'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::session',
    config: {
      key: env.array('APP_KEYS_SESSION'),
      maxAge: 3600000, // for an hour
      httpOnly: true,
      secure: env.bool('SESSION_SECURE_COOKIE', true),
      signed: true,
      sameSite: 'none',
    },
  },
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];