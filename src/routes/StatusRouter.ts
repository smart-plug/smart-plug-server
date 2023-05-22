import express, { Router } from 'express';
import StatusController from '../controllers/StatusController';
import StatusValidation from '../middlewares/validations/StatusValidation';
import ValidationBody from '../middlewares/validations/ValidationBody';
import ValidationHeader from '../middlewares/validations/ValidationHeader';
import UserValidation from '../middlewares/validations/UserValidation';
import ValidationParam from '../middlewares/validations/ValidationParam';
import UserDeviceValidation from '../middlewares/validations/UserDeviceValidation';
import ValidationCustom from '../middlewares/validations/ValidationCustom';
import StatusUserDeviceValidation from '../middlewares/validations/StatusUserDeviceValidation';

export default class DeviceRouter {
  private _router: Router;

  private _controller: StatusController;

  private _validationBody: ValidationBody;

  private _validationHeader: ValidationHeader;

  private _validationParam: ValidationParam;

  private _validationCustom: ValidationCustom;

  constructor(
    controller: StatusController = new StatusController(),
    validationBody: ValidationBody = new StatusValidation(),
    validationHeader: ValidationHeader = new UserValidation(),
    validationParam: ValidationParam = new UserDeviceValidation(),
    validationCustom: ValidationCustom = new StatusUserDeviceValidation()
  ) {
    this._router = express.Router();
    this._controller = controller;
    this._validationBody = validationBody;
    this._validationHeader = validationHeader;
    this._validationParam = validationParam;
    this._validationCustom = validationCustom;
    this._routes();
  }

  get router(): Router { return this._router; }

  private _routes = (): void => {
    const middlewaresBasic = [this._validationHeader.validateHeader, this._validationHeader.validateUser];
    this.router.get('/status/:deviceId', middlewaresBasic.concat([this._validationParam.validateParams, this._validationParam.validateUserDevice]), this._controller.get);
    this.router.post('/status', middlewaresBasic.concat([this._validationBody.validateBody, this._validationCustom.validateUserDevice]), this._controller.change);
  };
}
