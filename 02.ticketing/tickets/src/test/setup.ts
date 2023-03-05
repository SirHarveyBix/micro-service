import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var getAuthCookie: () => string[];
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

global.getAuthCookie = () => {
  // build JWT payload { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'kevin@domain.bg',
  };
  // create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // build session object :
  const session = { jwt: token };
  // turn session into json
  const sessionJSON = JSON.stringify(session);
  //take json, encode bas 64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  //return string > cookie encoded
  return [`session=${base64}`];
};
