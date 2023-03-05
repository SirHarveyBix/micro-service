import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

const id = new mongoose.Types.ObjectId().toHexString();

it('retruns 404 if provided id dosent not existe', async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'gig',
      price: 5,
    })
    .expect(404);
});

it('retruns 401 if not authenticated', async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'concert',
      price: 55,
    })
    .expect(401);
});

it('retruns 401 if user does not own the ticket', async () => {
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'gig',
      price: 5,
    });

  request(app)
    .post(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.getAuthCookie())
    .send({
      title: 'gig of Lola',
      price: 500000,
    })
    .expect(401);
});

it('retruns 400 if user provides invalid title / price', async () => {
  const cookie = global.getAuthCookie();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'gig',
      price: 5,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 72,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'beautiful song',
      price: -12,
    })
    .expect(400);
});

it('update the ticket if user provided ', async () => {
  const cookie = global.getAuthCookie();
  const response = await request(app)
    .post(`/api/tickets`)
    .set('Cookie', cookie)
    .send({
      title: 'Random gig',
      price: 5,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'beautiful song',
      price: 12,
    })
    .expect(200);

  const ticketResponse = await request(app) //
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual('beautiful song');
  expect(ticketResponse.body.price).toEqual(12);
});
