import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.status(400).send({ message: 'Nope, not working.' });
};
