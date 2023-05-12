import dotenv from 'dotenv';
import Joi from 'joi';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import { AUTHORIZATION_INVALID } from '../../utils/errors/errorsList';

dotenv.config();

export default abstract class ValidationHeader {
  protected _schema: Joi.ObjectSchema;

  constructor(schema: Joi.ObjectSchema) {
    this._schema = schema;
  }

  public validateHeader = (req: Req, res: Res, next: Next): typeof res | void => {
    try {
      const result = this._schema.validate(req.headers);
      if (result.error) {
        throw result.error;
      }

      if (req.headers.authorization != process.env.API_AUTHORIZATION) {
        throw AUTHORIZATION_INVALID;
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };

  public abstract validateUser(req: Req, res: Res, next: Next): Promise<typeof res | void>;
}
