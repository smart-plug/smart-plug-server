import dotenv from 'dotenv';
import App from './App';
import { NO_CONNECTION_DB, NO_CONNECTION_MQTT } from '../utils/errors/errorsList';
import connectDB from '../utils/bdConnection';
import mqttConnection from '../utils/mqttConnection';
import MqttSubscriberService from '../services/MqttSubscriberService';

import Router from 'express';
import { Request as Req, Response as Res } from 'express';

dotenv.config();
let hasError = 'NO_ERROR';

try {
  connectDB();
} catch (error) {
  hasError = 'DB_ERROR';
  console.log(error);
}

try {
  const mqttClient = mqttConnection();
  new MqttSubscriberService(mqttClient);
} catch (error) {
  hasError = 'MQTT_ERROR';
  console.log(error);
}

const app = new App();

const indexRouter = Router().get('/', (req: Req, res: Res) => {
  if (hasError == 'DB_ERROR') {
    return res.status(NO_CONNECTION_DB.statusCode).json({ message: `${NO_CONNECTION_DB.message}` });
  }
  if (hasError == 'MQTT_ERROR') {
    return res.status(NO_CONNECTION_MQTT.statusCode).json({ message: `${NO_CONNECTION_MQTT.message}` });
  }
  return res.json({ message: 'Hello World!' });
});
app.addRouter(indexRouter);

const port = process.env.PORT || 3000;
app.startServer(`${port}`);

export default app;
