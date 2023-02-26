import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  var getAuthCookie: () => Promise<string[]>;
}

const mongo = MongoMemoryServer.create();

beforeAll(async () => {
  process.env.JWT_KEY = 'for testing purposes only';

  const mongoUri = (await mongo).getUri();
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await (await mongo).stop();
  }
  await mongoose.connection.close();
});

global.getAuthCookie = async () => {
  const email = '666@deamon.hell';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
