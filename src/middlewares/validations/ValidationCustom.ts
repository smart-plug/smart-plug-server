import { Request as Req, Response as Res, NextFunction as Next } from 'express';

export default abstract class ValidationCustom {
  public abstract validateUserDevice(req: Req, res: Res, next: Next): Promise<typeof res | void>;
}
