import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@sh-ticket/common';
import { User } from '../models/user';
import { PasswordManager } from '../services/password-manager';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email') //
      .isEmail()
      .withMessage('Email must be valid.'),

    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must provide a password'),
  ],
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credientials');
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credientials');
    }

    // generate JWT
    const userJwt = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY! // already checked
    );
    //store on sesion object
    request.session = { jwt: userJwt };

    response.status(200).send(existingUser);
  }
);

export { router as signinRouter };
