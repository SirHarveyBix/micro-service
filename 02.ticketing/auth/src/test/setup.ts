import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

const mongo = MongoMemoryServer.create();

beforeAll(async () => {
  process.env.JWT_KEY = 'test';
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
