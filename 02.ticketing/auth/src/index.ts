import express from 'express';
import { json } from 'body-parser';

const PORT = 3000;
const app = express();
app.use(json());

app.get('/api/users/currentuser', (request, response) => {
  response.send('Hello World!');
});

app.listen(PORT, () => {
  console.info('Listening on\x1b[31m\x1b[1m', PORT, '🚀');
});
