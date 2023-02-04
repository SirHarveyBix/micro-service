const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (request, response) => {
  response.send(posts);
});

app.post('/events', (request, response) => {
  const { type, data } = request.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  console.info('posting :\n', posts);
  response.send({});
});

app.listen(PORT, () => {
  console.info(`Listening on ${PORT} as`, "\x1b[31m\x1b[1m", "Query");
});
