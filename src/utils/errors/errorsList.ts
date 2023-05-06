import CustomError from './CustomError';
import HttpStatusCodes from '../enums/HttpStatusCodes';

export const NO_CONNECTION_DB = new CustomError(
  HttpStatusCodes.INTERNAL_SERVER_ERROR,
  'Without connection with database'
);

export const USER_NOTFOUND = new CustomError(
  HttpStatusCodes.NOT_FOUND,
  'User not found'
);

export const USER_INVALID = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'Invalid username or password'
);

export const USER_UNAUTHORIZED = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'User does not have the right permission'
);

export const TOKEN_NOTFOUND = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'Token not found'
);

export const TOKEN_INVALID = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'Token is invalid'
);
