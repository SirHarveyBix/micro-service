import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (request, response) => {
  response.send('Hello World!');
});

export { router as currentUserRouter };
