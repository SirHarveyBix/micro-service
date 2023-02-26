import mongoose from 'mongoose';

import { app } from './app';

const PORT = 3000;

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
