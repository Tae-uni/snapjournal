module.exports = ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 8000),
  // url: env('PUBLIC_URL', 'https://localhost:1337'),
  proxy: true,
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
