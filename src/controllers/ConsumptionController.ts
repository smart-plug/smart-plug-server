import { Request as Req, Response as Res, NextFunction as Next } from 'express';
import HttpStatusCodes from '../utils/enums/HttpStatusCodes';
import ConsumptionService from '../services/ConsumptionService';
import { TConsumptionFilterString } from '../utils/types/TConsumption';

export default class ConsumptionController {
  private _service: ConsumptionService;

  constructor(service: ConsumptionService = new ConsumptionService()) {
    this._service = service;
  }

  public get = async (req: Req, res: Res, next: Next) => {
    try {
      const { deviceId } = req.params;
      const { startDate, endDate } = req.query;
      const consumptionFilter: TConsumptionFilterString = {
        startDate: startDate ? startDate.toString() : '',
        endDate: endDate ? endDate.toString() : ''
      };
      const consumption = await this._service.get(Number(deviceId), consumptionFilter);
      return res.status(HttpStatusCodes.OK).json({ message: 'Consumption.', response: consumption });
    } catch (error) {
      return next(error);
    }
  };
}
