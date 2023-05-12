import Joi from 'joi';
import { authorizationSchema } from '../../utils/validations/index';
import ValidationHeader from './ValidationHeader';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';

export default class AuthorizationValidation extends ValidationHeader {
  constructor(schema: Joi.ObjectSchema = authorizationSchema) {
    super(schema);
  }

  public validateUser = async (req: Req, res: Res, next: Next): Promise<typeof res | void> => {
    return await next();
  };
}
