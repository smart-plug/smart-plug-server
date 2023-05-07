import dotenv from 'dotenv';
import * as mqtt from 'mqtt';
import Measurement from '../models/mongoose/Measurement';
import TMeasurement from '../utils/types/TMeasurement';
import Status from '../models/mongoose/Status';
import TStatus from '../utils/types/TStatus';

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
      if (topic == `${process.env.MQTT_TOPIC_MEASUREMENT}`) {
        this.registerMeasurement(message.toString());
      }
      if (topic == `${process.env.MQTT_TOPIC_STATUS}`) {
        this.registerStatus(message.toString());
      }
    });
  }

  private async registerMeasurement(measurement : string) : Promise<void> {
    /*
    measurement
    {
      "device_id": 123,
      "current": 1.5,
      "voltage": 127,
      "timestamp": 1807110465663
    }
    */
    console.log('Try register measurement: ');
    console.log(measurement);

    try {
      await Measurement.create(this.treatMeasurement(measurement));
      console.log('Registered');
    } catch (error) {
      console.error('Error to register');
    }
  }

  private treatMeasurement(measurement : string) : TMeasurement {
    const { device_id, current, voltage, timestamp } = JSON.parse(measurement);

    const tMeasurement : TMeasurement = {
      device_id,
      current,
      voltage,
      reading: new Date(timestamp)
    };

    return tMeasurement;
  }

  private async registerStatus(status : string) : Promise<void> {
    /*
    status
    {
      "device_id": 123,
      "state": true
    }
    */
    console.log('Try register status: ');
    console.log(status);

    try {
      const tStatus = this.treatStatus(status);

      const statusRegister = await Status.findOne({ device_id: tStatus.device_id });

      if (statusRegister) {
        await Status.updateOne({ device_id: tStatus.device_id }, tStatus);
      } else {
        await Status.create(tStatus);
      }
      console.log('Registered');
    } catch (error) {
      console.error('Error to register');
    }
  }

  private treatStatus(status : string) : TStatus {
    const { device_id, state } = JSON.parse(status);

    const tStatus : TStatus = {
      device_id,
      state
    };

    return tStatus;
  }
}
