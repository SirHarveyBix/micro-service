import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

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
  (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      throw new Error('Invalid something');
      // return response.status(400).send(errors.array());
    }

    const { email, password } = request.body;
    console.info('Creating user !');
    response.send({ email: email, password: password });
  }
);

export { router as signupRouter };
