import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import HttpStatusCodes from '../utils/enums/HttpStatusCodes';
import ConsumptionService from '../services/ConsumptionService';

export default class ConsumptionController {
  private _service: ConsumptionService;

  constructor(service: ConsumptionService = new ConsumptionService()) {
    this._service = service;
  }

  public get = async (req: Req, res: Res, next: Next) => {
    try {
      const { deviceId } = req.params;
      const consumption = await this._service.get(Number(deviceId));
      return res.status(HttpStatusCodes.OK).json({ message: 'Consumption found.', response: consumption });
    } catch (error) {
      return next(error);
    }
  };
}
