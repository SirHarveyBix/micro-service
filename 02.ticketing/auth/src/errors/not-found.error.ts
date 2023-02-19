import { CustomError } from './abstract-custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super('Route Not Found');
    //because we extending a built in class (Error)
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
  serializeError(): { message: string; field?: string }[] {
    return [{ message: 'Not Found' }];
  }
}
