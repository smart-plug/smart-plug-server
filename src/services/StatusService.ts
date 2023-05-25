import { TStatus } from '../utils/types/TStatus';
import { Model } from 'mongoose';
import Status from '../models/mongoose/Status';
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
      const deviceWithFalseState: TStatus = {
        deviceId: deviceId,
        state: false
      };

      return deviceWithFalseState;
    }

    return device;
  };

  public change = async (status: TStatus): Promise<TStatus> => {
    const mqttClient = await mqttConnection();
    const mqttPublisherService = new MqttPublisherService(mqttClient);
    mqttPublisherService.publishStatusUpdate(status);
    return status;
  };
}
