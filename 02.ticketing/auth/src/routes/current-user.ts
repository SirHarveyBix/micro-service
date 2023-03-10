import express, { Request, Response } from 'express';

import { currentUser } from '@sh-ticket/common';

const router = express.Router();

router.get(
  '/api/users/currentuser',
  currentUser,
  (request: Request, response: Response) => {
    response.send({ currentUser: request.currentUser || null });
  }
);

export { router as currentUserRouter };
