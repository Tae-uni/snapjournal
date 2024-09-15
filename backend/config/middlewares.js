module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      // enable: true,
      origin: ['https://localhost:3000'],
      headers: [
        'Content-Type',
        'Authorization',
        'X-Frame-Options',
        'X-Forwarded-For',
        'Access-Control-Allow-Credentials',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      credentials: true,
    },
  },
  'strapi::query',
  {
    name: 'strapi::session',
    config: {
      key: env.array('APP_KEYS_SESSION'),
      maxAge: 3600000, // for an hour
      httpOnly: true,
      // secure: true,
      signed: true,
      sameSite: 'none',
    },
  },
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];