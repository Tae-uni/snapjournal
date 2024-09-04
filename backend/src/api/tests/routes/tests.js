module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/tests',
      handler: 'tests.testA',
      config: {
        policies: [],
      },
    },
  ],
};