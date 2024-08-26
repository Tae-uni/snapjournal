module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },

  // for https
  ssl: {
    enabled: true,
    key: '../certificates/localhost-key.pem',
    cert: '../certificates/localhost.pem',
  },
});
