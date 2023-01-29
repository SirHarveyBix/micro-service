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
  });
  commentByPostId[request.params.id] = comments;

  await axios
    .post('http://localhost:4005/events', {
      type: 'CommentCreated',
      data: {
        id: commentId,
        content,
        postId: request.params.id,
      },
    })
    .catch((error) => console.error(error.message));

  response.status(201).send(comments);
});

app.post('/events', (request, response) => {
  console.info('Received Event : ', request.body.type);
  response.send({});
});

app.listen(PORT, () => {
  console.info(`Listening on ${PORT}`);
});
