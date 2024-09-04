module.exports = ({ env }) => {
  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    {
      name: 'strapi::cors',
      config: {
        enabled: true,
        origin: ['https://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      },
    },
    'strapi::poweredBy',
    'strapi::query',
    {
      name: 'strapi::session',
      config: {
        key: env.array('APP_KEYS_SESSION'),
        maxAge: 360000,
        httpOnly: true,
        secure: env.bool('SESSION_SECURE_COOKIE', true),
        signed: true,
      },
    },
    'strapi::body',
    'strapi::favicon',
    'strapi::public',
  ];
};