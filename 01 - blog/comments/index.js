const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentByPostId = {}

app.get('/post/:id/comments', (request, response) => {

  response.send(commentByPostId[request.params.id] || 'No data provided')
});

app.post('/post/:id/comments', (request, response) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = request.body
  const comments = commentByPostId[request.params.id] || []

  comments.push({
    id: commentId,
    content,
  })
  commentByPostId[request.params.id] = comments

  response.status(201).send(comments)
});


app.listen(4001, () => {
  console.info('Listening on 4001');
});
