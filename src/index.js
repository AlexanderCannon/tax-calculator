const express = require('express');
const { getNet } = require('./routes');

const app = express();
const port = process.env.port || '1920';

app.get('/', getNet);

app.listen(port, (err) => {
  if (err) throw new Error(err);
  process.stdout.write(`Server listening on ${port}`);
});
