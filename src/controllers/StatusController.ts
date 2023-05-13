import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import HttpStatusCodes from '../utils/enums/HttpStatusCodes';
import StatusService from '../services/StatusService';

export default class DeviceController {
  private _service: StatusService;

  constructor(service: StatusService = new StatusService()) {
    this._service = service;
  }

  public get = async (req: Req, res: Res, next: Next) => {
    try {
      const { deviceId } = req.params;
      const status = await this._service.get(Number(deviceId));
      return res.status(HttpStatusCodes.OK).json({ message: 'Status found.', response: { status: status } });
    } catch (error) {
      return next(error);
    }
  };

  public loadChange = async (req: Req, res: Res, next: Next) => {
    try {
      const { deviceId, state } = req.body;
      const status = await this._service.loadChange({ deviceId, state });
      return res.status(HttpStatusCodes.OK).json({ message: 'Load change request made successfully.', response: { status: status } });
    } catch (error) {
      return next(error);
    }
  };
}
