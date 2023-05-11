import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import HttpStatusCodes from '../utils/enums/HttpStatusCodes';
import LoginService from '../services/LoginService';
import { TLogin } from '../utils/types/TUser';

export default class LoginController {
  private _service: LoginService;

  constructor(service: LoginService = new LoginService()) {
    this._service = service;
  }

  public login = async (req: Req, res: Res, next: Next) => {
    try {
      const { username, password } : TLogin = req.body;
      const user = await this._service.login({ username, password });
      return res.status(HttpStatusCodes.OK).json({ message: 'User valid.', response: { user: user } });
    } catch (error) {
      return next(error);
    }
  };
}
