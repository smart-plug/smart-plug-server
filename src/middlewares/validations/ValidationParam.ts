import Joi from 'joi';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';

export default abstract class ValidationParam {
  protected _schema: Joi.ObjectSchema;

  constructor(schema: Joi.ObjectSchema) {
    this._schema = schema;
  }

  public validateParams = (req: Req, res: Res, next: Next): typeof res | void => {
    try {
      const result = this._schema.validate(req.params);
      if (result.error) {
        throw result.error;
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };

  public abstract validateUserDevice(req: Req, res: Res, next: Next): Promise<typeof res | void>;
}
