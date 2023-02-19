import express, { Request, Response } from 'express';
import {
  Result,
  ValidationError,
  body,
  validationResult,
} from 'express-validator';
import { RequestValidationError } from '../errors/request-validation.error';
import { DatabaseConnectionError } from '../errors/database-connection.error';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email') //
      .isEmail()
      .withMessage('Email must be valid.'),

    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 & 20 chars.'),
  ],
  async (request: Request, response: Response) => {
    const errors: Result<ValidationError> = validationResult(request);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = request.body;
    console.info('Creating user !');
    // throw new DatabaseConnectionError();

    response.send({ email: email, password: password });
  }
);

export { router as signupRouter };
