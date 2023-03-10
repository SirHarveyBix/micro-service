import { requireAuth, validateRequest } from '@sh-ticket/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets', async (request: Request, response: Response) => {
  const tickets = await Ticket.find({});
  response.send(tickets);
});

export { router as indexTicketRouter };
