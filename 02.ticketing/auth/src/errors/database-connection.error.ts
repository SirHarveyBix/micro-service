import { CustomError } from './abstract-custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connecting to database');
    //because we extending a built in class (Error)
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  serializeError() {
    return [
      {
        message: this.reason,
      },
    ];
  }
}
