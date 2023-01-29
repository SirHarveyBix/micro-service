const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const PORT = 4005;

const app = express();
app.use(bodyParser.json());
// app.use(cors());

app.post('/events', (request, response) => {
  const event = request.body;

  // posts
  axios
    .post('http://localhost:4000/events', event)
    .catch((error) => console.error(error.message));

  // comments
  axios
    .post('http://localhost:4001/events', event)
    .catch((error) => console.error(error.message));

  // query
  axios
    .post('http://localhost:4002/events', event)
    .catch((error) => console.error(error.message));

  response.send({ status: 'OK' });
});

app.listen(PORT, () => {
  console.info(`Listening on ${PORT}`);
});
