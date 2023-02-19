import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/abstract-custom-error';

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return response
      .status(error.statusCode)
      .send({ errors: error.serializeError() });
  }

  response.status(400).send({
    errors: [
      {
        message: error.message,
      },
    ],
  });
};
