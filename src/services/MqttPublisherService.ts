import dotenv from 'dotenv';
import * as mqtt from 'mqtt';
import { TStatus, TStatusMqtt } from '../utils/types/TStatus';

dotenv.config();

export default class MqttSubscriberService {
  private _mqttClient: mqtt.Client;

  constructor(mqttClient: mqtt.Client) {
    this._mqttClient = mqttClient;
  }

  public publishStatusUpdate(status: TStatus) : void {
    const topic = `${process.env.MQTT_TOPIC_CHANGE_STATUS}/${status.deviceId}`;
    const statusMqtt: TStatusMqtt = {
      state: status.state
    };
    const statusString = JSON.stringify(statusMqtt);
    this._mqttClient.publish(topic, statusString, {
      qos: 0,
      retain: false
    });
  }
}
