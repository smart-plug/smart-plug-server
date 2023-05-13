import dotenv from 'dotenv';
import * as mqtt from 'mqtt';
import Tstatus from '../utils/types/TStatus';

dotenv.config();

export default class MqttSubscriberService {
  private _mqttClient: mqtt.Client;

  constructor(mqttClient: mqtt.Client) {
    this._mqttClient = mqttClient;
  }

  public publishStatusUpdate(status: Tstatus) : void {
    const topic = `${process.env.MQTT_TOPIC_LOAD_CHANGE}`;
    const statusString = JSON.stringify(status);
    this._mqttClient.publish(topic, statusString, {
      qos: 0,
      retain: false
    });
  }
}
