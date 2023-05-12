import express, { Router } from 'express';
import DeviceController from '../controllers/DeviceController';
import DeviceValidation from '../middlewares/validations/DeviceValidation';
import ValidationBody from '../middlewares/validations/ValidationBody';
import ValidationHeader from '../middlewares/validations/ValidationHeader';
import UserValidation from '../middlewares/validations/UserValidation';

export default class DeviceRouter {
  private _router: Router;

  private _controller: DeviceController;

  private _validationBody: ValidationBody;

  private _validationHeader: ValidationHeader;

  constructor(
    controller: DeviceController = new DeviceController(),
    validationBody: ValidationBody = new DeviceValidation(),
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
    this.router.post('/devices', [this._validationHeader.validateHeader, this._validationHeader.validateUser, this._validationBody.validateBody], this._controller.create);
    this.router.get('/devices', [this._validationHeader.validateHeader, this._validationHeader.validateUser], this._controller.getAll);
    this.router.delete('/devices', [this._validationHeader.validateHeader, this._validationHeader.validateUser, this._validationBody.validateBody], this._controller.delete);
    this.router.put('/devices', [this._validationHeader.validateHeader, this._validationHeader.validateUser, this._validationBody.validateBody], this._controller.update);
  };
}
