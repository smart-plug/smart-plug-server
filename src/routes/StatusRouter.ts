import express, { Router } from 'express';
import StatusController from '../controllers/StatusController';
import StatusValidation from '../middlewares/validations/StatusValidation';
import ValidationBody from '../middlewares/validations/ValidationBody';
import ValidationHeader from '../middlewares/validations/ValidationHeader';
import UserValidation from '../middlewares/validations/UserValidation';

export default class DeviceRouter {
  private _router: Router;

  private _controller: StatusController;

  private _validationBody: ValidationBody;

  private _validationHeader: ValidationHeader;

  constructor(
    controller: StatusController = new StatusController(),
    validationBody: ValidationBody = new StatusValidation(),
    validationHeader: ValidationHeader = new UserValidation()
  ) {
    this._router = express.Router();
    this._controller = controller;
    this._validationBody = validationBody;
    this._validationHeader = validationHeader;
    this._routes();
  }

  get router(): Router { return this._router; }

  private _routes = (): void => {
    this.router.get('/status/:deviceId', [this._validationHeader.validateHeader, this._validationHeader.validateUser], this._controller.get);
    this.router.post('/status', [this._validationHeader.validateHeader, this._validationHeader.validateUser, this._validationBody.validateBody], this._controller.loadChange);
  };
}
