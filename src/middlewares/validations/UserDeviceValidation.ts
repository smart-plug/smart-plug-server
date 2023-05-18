import Joi from 'joi';
import { deviceIdSchema } from '../../utils/validations/index';
import ValidationParam from './ValidationParam';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import DeviceService from '../../services/DeviceService';
import { USER_DEVICE_NOTFOUND } from '../../utils/errors/errorsList';

export default class UserDeviceValidation extends ValidationParam {
  private _service: DeviceService;

  constructor(schema: Joi.ObjectSchema = deviceIdSchema,
    service: DeviceService = new DeviceService()) {
    super(schema);
    this._service = service;
  }

  public validateUserDevice = async (req: Req, res: Res, next: Next): Promise<typeof res | void> => {
    try {
      const { deviceId } = req.params;
      const { user_id } = req.headers;
      await this._service.get(Number(deviceId), Number(user_id));
      return next();
    } catch (error) {
      return next(USER_DEVICE_NOTFOUND);
    }
  };
}
