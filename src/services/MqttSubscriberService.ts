import dotenv from 'dotenv';
import * as mqtt from 'mqtt';

dotenv.config();

export default class MqttSubscriberService {
  private _mqttClient: mqtt.Client;

  constructor(mqttClient: mqtt.Client) {
    this._mqttClient = mqttClient;
    this.subscriberMeasurement();
    this.subscriberStatus();
    this.monitoringTopics();
  }

  private subscriberMeasurement() : void {
    this._mqttClient.subscribe(`${process.env.MQTT_TOPIC_MEASUREMENT}`, { qos: 0 });
  }

  private subscriberStatus() : void {
    this._mqttClient.subscribe(`${process.env.MQTT_TOPIC_STATUS}`, { qos: 0 });
  }

  private monitoringTopics(): void {
    this._mqttClient.on('message', (topic, message) => {
      console.log(
        'Received Message: ' + message.toString() + '\nOn topic: ' + topic
      );
    });
  }
}
