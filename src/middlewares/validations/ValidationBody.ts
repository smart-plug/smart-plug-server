import Joi from 'joi';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';

export default abstract class ValidationBody {
  protected _schema: Joi.ObjectSchema;

  constructor(schema: Joi.ObjectSchema) {
    this._schema = schema;
  }

  public validateBody = (req: Req, res: Res, next: Next): typeof res | void => {
    try {
      const result = this._schema.validate(req.body);
      if (result.error) {
        return next(result.error);
      }
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
