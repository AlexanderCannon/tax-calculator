const { getNet } = require('../controllers');

async function routes(fastify) {
  fastify.post('/', getNet);
}

module.exports = routes;
