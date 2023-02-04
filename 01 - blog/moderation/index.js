const express = require('express');
const axios = require('axios');

const bodyParser = require('body-parser');

const PORT = 4003;

const app = express();
app.use(bodyParser.json());

app.post('/events', (request, response) => {
  // axios.
})



app.listen(PORT, () => {
  console.info(`Listening on ${PORT} as`, "\x1b[31m\x1b[1m", "Moderation");
});
