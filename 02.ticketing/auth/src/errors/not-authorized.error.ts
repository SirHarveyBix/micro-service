import { CustomError } from '../errors/abstract-custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode: number = 401;

  constructor() {
    super('Not Authorized');
    //because we extending a built in class (Error)
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeError(): { message: string; field?: string }[] {
    return [{ message: 'Not Authorized' }];
  }
}
