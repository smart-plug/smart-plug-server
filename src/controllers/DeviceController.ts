import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import HttpStatusCodes from '../utils/enums/HttpStatusCodes';
import DeviceService from '../services/DeviceService';
import { TDevice } from '../utils/types/TDevice';

export default class DeviceController {
  private _service: DeviceService;

  constructor(service: DeviceService = new DeviceService()) {
    this._service = service;
  }

  public create = async (req: Req, res: Res, next: Next) => {
    try {
      const { deviceId, name } : TDevice = req.body;
      const tdevice : TDevice = {
        deviceId: deviceId,
        name: name,
        userId: Number(req.headers.user_id)
      };
      const device = await this._service.create(tdevice);
      return res.status(HttpStatusCodes.OK).json({ message: 'Created device.', response: { device: device } });
    } catch (error) {
      return next(error);
    }
  };

  public getAll = async (req: Req, res: Res, next: Next) => {
    try {
      const { user_id } = req.headers;
      const devices = await this._service.getAll(Number(user_id));
      return res.status(HttpStatusCodes.OK).json({ message: 'Listed devices.', response: { devices: devices } });
    } catch (error) {
      return next(error);
    }
  };

  public delete = async (req: Req, res: Res, next: Next) => {
    try {
      const { deviceId, name } : TDevice = req.body;
      const tdevice : TDevice = {
        deviceId: deviceId,
        name: name,
        userId: Number(req.headers.user_id)
      };
      const device = await this._service.delete(tdevice);
      return res.status(HttpStatusCodes.OK).json({ message: 'Deleted device.', response: { device: device } });
    } catch (error) {
      return next(error);
    }
  };

  public update = async (req: Req, res: Res, next: Next) => {
    try {
      const { deviceId, name } : TDevice = req.body;
      const tdevice : TDevice = {
        deviceId: deviceId,
        name: name,
        userId: Number(req.headers.user_id)
      };
      const device = await this._service.update(tdevice);
      return res.status(HttpStatusCodes.OK).json({ message: 'Updated device.', response: { device: device } });
    } catch (error) {
      return next(error);
    }
  };
}
