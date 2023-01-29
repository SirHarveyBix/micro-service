const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => response.send(posts));

app.post('/posts', async (request, response) => {
  const id = randomBytes(4).toString('hex');
  const { title } = request.body;

  posts[id] = {
    id,
    title,
  };

  await axios
    .post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    })
    .catch((error) => console.error(error.message));

  response.status(201).send(posts[id]);
});

app.post('/events', (request, response) => {
  console.info('Received Event : ', request.body.type);
  response.send({});
});

app.listen(PORT, () => {
  console.info(`Listening on ${PORT}`);
});
