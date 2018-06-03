const fastify = require('fastify')();
const helmet = require('fastify-helmet');
const { defaultTo } = require('ramda');

const routes = require('./routes');

const port = defaultTo(1920, process.env.port);

fastify.register(
  helmet,
  { hidePoweredBy: { setTo: 'PHP 6.11.3' } },
);
fastify.register(routes);

const start = async () => {
  try {
    fastify.listen(port, '127.0.0.1', (err) => {
      if (err) throw new Error(err);
      process.stdout.write(`server listening on ${fastify.server.address().port}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
