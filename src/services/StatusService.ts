import TStatus from '../utils/types/TStatus';
import { Model } from 'mongoose';
import Status from '../models/mongoose/Status';
import { DEVICE_STATUS_NOTFOUND } from '../utils/errors/errorsList';

export default class StatusnService {
  private _model: Model<TStatus>;

  constructor(model: Model<TStatus> = Status) {
    this._model = model;
  }

  public get = async (deviceId: number): Promise<TStatus> => {
    const device = await this._model.findOne({ deviceId: deviceId }, {_id: 0});

    if (!device) {
      throw DEVICE_STATUS_NOTFOUND;
    }

    return device;
  };
}
