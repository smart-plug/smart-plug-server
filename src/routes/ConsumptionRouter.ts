import express, { Router } from 'express';
import ConsumptionController from '../controllers/ConsumptionController';
import ValidationHeader from '../middlewares/validations/ValidationHeader';
import ValidationParam from '../middlewares/validations/ValidationParam';
import UserValidation from '../middlewares/validations/UserValidation';
import UserDeviceValidation from '../middlewares/validations/UserDeviceValidation';

export default class ConsumptionRouter {
  private _router: Router;

  private _controller: ConsumptionController;

  private _validationHeader: ValidationHeader;

  private _validationParam: ValidationParam;

  constructor(
    controller: ConsumptionController = new ConsumptionController(),
    validationHeader: ValidationHeader = new UserValidation(),
    validationParam: ValidationParam = new UserDeviceValidation()
  ) {
    this._router = express.Router();
    this._controller = controller;
    this._validationHeader = validationHeader;
    this._validationParam = validationParam;
    this._routes();
  }

  get router(): Router { return this._router; }

  private _routes = (): void => {
    const middlewares = [this._validationHeader.validateHeader, this._validationHeader.validateUser, this._validationParam.validateParams, this._validationParam.validateUserDevice];
    this.router.get('/consumption/:deviceId', middlewares, this._controller.get);
  };
}
