import ValidationCustom from './ValidationCustom';
import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import DeviceService from '../../services/DeviceService';
import { USER_DEVICE_NOTFOUND } from '../../utils/errors/errorsList';

export default class StatusUserDeviceValidation extends ValidationCustom {
  private _service: DeviceService;

  constructor(service: DeviceService = new DeviceService()) {
    super();
    this._service = service;
  }

  public validateUserDevice = async (req: Req, res: Res, next: Next): Promise<typeof res | void> => {
    try {
      const { deviceId } = req.body;
      const { user_id } = req.headers;
      await this._service.get(Number(deviceId), Number(user_id));
      return next();
    } catch (error) {
      return next(USER_DEVICE_NOTFOUND);
    }
  };
}
