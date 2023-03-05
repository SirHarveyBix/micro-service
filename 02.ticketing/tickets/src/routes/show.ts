import { NotFoundError } from '@sh-ticket/common';
import express, { Request, Response } from 'express';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (request: Request, response: Response) => {
  const ticket = await Ticket.findById(request.params.id).catch((error) =>
    console.error(error)
  );

  if (!ticket) {
    throw new NotFoundError();
  }

  response.send(ticket);
});

export { router as showTicketRouter };
