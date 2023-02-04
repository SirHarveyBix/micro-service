const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const PORT = 4001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentByPostId = {};

app.get('/posts/:id/comments', (request, response) => {
  response.send(commentByPostId[request.params.id] || []);
});

app.post('/posts/:id/comments', async (request, response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = request.body;
  const comments = commentByPostId[request.params.id] || [];

  comments.push({
    id: commentId,
    content,
    status: 'pending',
  });
  commentByPostId[request.params.id] = comments;

  await axios
    .post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: request.params.id,
        status: 'pending',
      },
    })
    .catch((error) => console.error(error.message));

  response.status(201).send(comments);
});

app.post('/events', async (request, response) => {
  const { type, data } = request.body;
  console.info('\x1b[31mComments\033[m Received Event :', type);
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);

    comment.staus = status;

    await axios.post('http://localhost:4005/events' /*event-bus*/, {
      type: 'CommentUpdated',
      data: {
        postId,
        id,
        status,
        content,
      },
    });
  }

  response.send({});
});

app.listen(PORT, () => {
  console.info(`Listening on ${PORT} as`, '\x1b[31m\x1b[1mComments\033[m');
});
