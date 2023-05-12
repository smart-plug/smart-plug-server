import Joi from 'joi';
import { userSchema } from '../../utils/validations/index';
import ValidationHeader from './ValidationHeader';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import UserService from '../../services/UserService';

export default class UserValidation extends ValidationHeader {
  private _service: UserService;

  constructor(schema: Joi.ObjectSchema = userSchema,
    service: UserService = new UserService()) {
    super(schema);
    this._service = service;
  }

  public validateUser = async (req: Req, res: Res, next: Next): Promise<typeof res | void> => {
    try {
      await this._service.get(Number(req.headers.user_id));
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
