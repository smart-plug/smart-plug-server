import express, { Router } from 'express';
import LoginController from '../controllers/LoginController';
import LoginValidation from '../middlewares/validations/LoginValidation';
import ValidationBody from '../middlewares/validations/ValidationBody';
import ValidationHeader from '../middlewares/validations/ValidationHeader';
import AuthorizationValidation from '../middlewares/validations/AuthorizationValidation';

export default class LoginRouter {
  private _router: Router;

  private _controller: LoginController;

  private _validationBody: ValidationBody;

  private _validationHeader: ValidationHeader;

  constructor(
    controller: LoginController = new LoginController(),
    validationBody: ValidationBody = new LoginValidation(),
    validationHeader: ValidationHeader = new AuthorizationValidation()
  ) {
    this._router = express.Router();
    this._controller = controller;
    this._validationBody = validationBody;
    this._validationHeader = validationHeader;
    this._routes();
  }

  get router(): Router { return this._router; }

  private _routes = (): void => {
    this.router.post('/login', [this._validationHeader.validateHeader, this._validationBody.validateBody], this._controller.login);
  };
}
