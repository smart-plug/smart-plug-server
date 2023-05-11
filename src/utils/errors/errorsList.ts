import CustomError from './CustomError';
import HttpStatusCodes from '../enums/HttpStatusCodes';

export const NO_CONNECTION_DB = new CustomError(
  HttpStatusCodes.INTERNAL_SERVER_ERROR,
  'Without connection with database'
);

export const NO_CONNECTION_MQTT = new CustomError(
  HttpStatusCodes.INTERNAL_SERVER_ERROR,
  'Without connection with broker mqtt'
);

export const USER_NOTFOUND = new CustomError(
  HttpStatusCodes.NOT_FOUND,
  'User not found'
);

export const USER_INVALID_PASSWORD = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'Invalid password'
);

export const USER_UNAUTHORIZED = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'User does not have the right permission'
);

export const AUTHORIZATION_NOTFOUND = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'Authorization not found'
);

export const AUTHORIZATION_INVALID = new CustomError(
  HttpStatusCodes.UNAUTHORIZED,
  'Authorization is invalid'
);
