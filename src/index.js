const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const { getNet } = require('./routes');

const port = process.env.port || '1920';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.post('/', getNet);

app.listen(port, (err) => {
  if (err) throw new Error(err);
  process.stdout.write(`Server listening on ${port}`);
});
