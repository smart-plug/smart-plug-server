// import TConsumption from '../utils/types/TConsumption';
import TMeasurement from '../utils/types/TMeasurement';
import { Model } from 'mongoose';
import Measurement from '../models/mongoose/Measurement';
import { CONSUMPTION_DATA_NOTFOUND } from '../utils/errors/errorsList';

export default class ConsumptionService {
  private _model: Model<TMeasurement>;

  constructor(model: Model<TMeasurement> = Measurement) {
    this._model = model;
  }

  public get = async (deviceId: number): Promise<Array<TMeasurement>> => {
    const consumptions = await this._model.find({ deviceId: deviceId });

    if (consumptions.length == 0) {
      throw CONSUMPTION_DATA_NOTFOUND;
    }

    return consumptions;
  };
}
