import request from 'supertest';
import { app } from '../../app';

it('responds with details on current user', async () => {
  const cookie = await global.getAuthCookie();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('666@deamon.hell');
});

it('responds null if not Authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
