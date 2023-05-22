import { TStatus } from '../utils/types/TStatus';
import { Model } from 'mongoose';
import Status from '../models/mongoose/Status';
import { DEVICE_STATUS_NOTFOUND } from '../utils/errors/errorsList';
import mqttConnection from '../utils/connections/mqttConnection';
import MqttPublisherService from '../services/MqttPublisherService';

export default class StatusService {
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

  public change = async (status: TStatus): Promise<TStatus> => {
    const device = await this._model.findOne({ deviceId: status.deviceId });

    if (!device) {
      throw DEVICE_STATUS_NOTFOUND;
    }

    const mqttClient = await mqttConnection();
    const mqttPublisherService = new MqttPublisherService(mqttClient);
    mqttPublisherService.publishStatusUpdate(status);
    return status;
  };
}
