const express = require('express');
const axios = require('axios');

const bodyParser = require('body-parser');

const PORT = 4003;

const app = express();
app.use(bodyParser.json());

app.post('/events', async (request, response) => {
  const { type, data } = request.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios
      // .post('http://localhost:4005/events' /*event-bus*/, {
      .post('http://event-bus-srv:4005/events' /*event-bus*/, {
        type: 'CommentModerated',
        data: {
          id: data.id,
          postId: data.postId,
          content: data.content,
          status,
        },
      });
  }
  response.send({});
});

app.listen(PORT, () => {
  console.info(`Listening on ${PORT} as`, '\x1b[31m\x1b[1mModeration\033[m');
});
