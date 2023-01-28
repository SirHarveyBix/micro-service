const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (request, response) => response.send(posts));

app.post('/posts', (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;

  posts[id] = {
    id,
    title
  };

  response.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.info('Listening on 4000');
});
