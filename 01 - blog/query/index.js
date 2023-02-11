const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const PORT = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  } else if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    post.comments.push({ id, content, status });
  } else if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => comment.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/events', (request, response) => {
  const { type, data } = request.body;
  handleEvent(type, data);

  console.info('posted :\n', posts);
  response.send({});
});

app.listen(PORT, async () => {
  console.info(`Listening on ${PORT} as`, '\x1b[31m\x1b[1mQuery\033[m');

  try {
    const response = await axios.get(
      // 'http://localhost:4005/events' /*event-bus*/
      'http://envent-bus-srv:4005/events'
    );
    response.data.forEach((event) => {
      console.info(' \x1b[31mQuery\033[m Processing event :', event.type);
      return handleEvent(event.type, event.data);
    });
  } catch (error) {
    console.error(error);
  }
});
