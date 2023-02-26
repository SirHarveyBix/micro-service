import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found.error';

const PORT = 3000;
const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (_request, _response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://auth-mongo-service:27017/auth');
    console.log('Connected to Mongo.');
  } catch (error) {
    console.error(error);
  }
};

app.listen(PORT, () => {
  console.info('Listening on\x1b[31m\x1b[1m', PORT, '🚀', '\u001b[0m');
});

start();
