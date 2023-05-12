import { TDevice } from '../utils/types/TDevice';
import { Model } from 'mongoose';
import Device from '../models/mongoose/Device';
import { DEVICE_EXISTS, DEVICE_DONT_EXISTS } from '../utils/errors/errorsList';
import dotenv from 'dotenv';

dotenv.config();

export default class LoginService {
  private _model: Model<TDevice>;

  constructor(model: Model<TDevice> = Device) {
    this._model = model;
  }

  public create = async (device: TDevice): Promise<TDevice> => {
    const deviceFind = await this._model.findOne({ deviceId: device.deviceId, userId: device.userId });

    if (deviceFind) {
      throw DEVICE_EXISTS;
    }

    if (!device.name) {
      device.name = `${process.env.DEFAULT_DEVICE_NAME}`;
    }

    const { deviceId, name, userId } = await this._model.create(device);

    return { deviceId, name, userId };
  };

  public getAll = async (): Promise<Array<TDevice>> => {
    const devices = await this._model.find({}, {_id: 0});

    return devices;
  };

  public delete = async (device: TDevice): Promise<TDevice> => {
    const deviceFind = await this._model.findOne({ deviceId: device.deviceId, userId: device.userId }, { _id: 0 });

    if (!deviceFind) {
      throw DEVICE_DONT_EXISTS;
    }

    await this._model.deleteOne({ deviceId: device.deviceId, userId: device.userId });

    return deviceFind;
  };

  public update = async (device: TDevice): Promise<TDevice> => {
    const deviceUpdate = await this._model.updateOne({ deviceId: device.deviceId, userId: device.userId }, device);

    if (deviceUpdate.matchedCount == 0) {
      throw DEVICE_DONT_EXISTS;
    }

    const deviceFind = await this._model.find({ deviceId: device.deviceId, userId: device.userId }, {_id: 0});

    return deviceFind[0];
  };
}
