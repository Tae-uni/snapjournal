module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  {
    name: 'strapi::cors',
    config: {
      enable: true,
      origin: 'https://localhost:3000',
      headers: [
        'Content-Type',
        'Authorization',
        'X-Frame-Options',
        'X-Forwarded-For',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin',
      ],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
      credentials: true,
      keepHeaderOnError: true,
      proxy: true,
    },
  },
  'strapi::query',
  'strapi::session',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'global::cookie-setter',
    resolve: './src/middlewares/cookie-setter',
  },

  {
    name: 'global::cookie-getter',
    resolve: './src/middlewares/cookie-getter',
  },
];