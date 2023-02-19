import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (request, response) => {
  response.send('signin!');
});

export { router as signinRouter };
