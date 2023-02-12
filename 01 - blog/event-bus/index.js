const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = 4005;

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (request, response) => {
  const event = request.body;
  events.push(event);

  // posts
  axios
    // .post('http://localhost:4000/events', event)
    .post('http://posts-clusterip-srv:4000/events', event)
    .catch((error) => console.error(error.message));

  // comments
  axios
    // .post('http://localhost:4001/events', event)
    .post('http://comments-srv:4001/events', event)
    .catch((error) => console.error(error.message));

  // query
  axios
    // .post('http://localhost:4002/events', event)
    .post('http://query-srv:4002/events', event)

    .catch((error) => console.error(error.message));

  // moderation
  axios
    // .post('http://localhost:4003/events', event)
    .post('http://moderation-srv:4003/events', event)
    .catch((error) => console.error(error.message));

  response.send({ status: 'OK' });
});

app.get('/events', (_request, response) => {
  response.send(events);
});

app.listen(PORT, () => {
  console.info(`Listening on ${PORT} as`, '\x1b[31m\x1b[1mEvent Bus\033[m');
});
