import express, { Request, Response } from 'express';
import {
  Result,
  ValidationError,
  body,
  validationResult,
} from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { RequestValidationError } from '../errors/request-validation.error';
import { BadRequestError } from '../errors/bad-request.error';

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
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('This e-mail is already in use.');
    }

    const user = User.build({ email, password });
    await user.save();

    // generate JWT
    const userJwt = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY! // already checked
    );
    //store on sesion object
    request.session = { jwt: userJwt };

    response.status(201).send(user);
  }
);

export { router as signupRouter };
