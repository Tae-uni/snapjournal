module.exports = {
  async testA(ctx) {
    ctx.session.test = 'testValue';

    ctx.send({ message: 'Session set' });
    console.log('HI');
  },
};