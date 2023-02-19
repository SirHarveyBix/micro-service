import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found.error';

const PORT = 3000;
const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (_request, _response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.info('Listening on\x1b[31m\x1b[1m', PORT, '🚀', '\u001b[0m');
});
