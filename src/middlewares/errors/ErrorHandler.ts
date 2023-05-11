import { Request as Req, Response as Res, NextFunction as Next} from 'express';
import { ValidationError } from 'joi';
import TCustomError from '../../utils/types/Error';
import HttpStatusCodes from '../../utils/enums/HttpStatusCodes';

type TErrorHandler = TCustomError & ValidationError;

export default class ErrorHandler {
  public static handle = (err: TErrorHandler, _req: Req, res: Res, _next: Next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    if (err.isJoi) {
      return res.status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: err.details[0].message });
    }

    if (err.statusCode) {
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  };
}
