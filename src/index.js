const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { defaultTo } = require('ramda');

const { getNet } = require('./routes');

const port = defaultTo(1920, process.env.port);

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.post('/', getNet);

app.listen(port, (err) => {
  if (err) throw new Error(err);
  process.stdout.write(`Server listening on ${port}`);
});
