import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request.error';
import { validateRequest } from '../middleware/validate-request';

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
  validateRequest,
  async (request: Request, response: Response) => {
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
