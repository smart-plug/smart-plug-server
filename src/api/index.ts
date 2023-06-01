import dotenv from 'dotenv';
import App from './App';
import { NO_CONNECTION_DB, NO_CONNECTION_MQTT } from '../utils/errors/errorsList';
import connectDB from '../utils/connections/dbConnection';
import mqttConnection from '../utils/connections/mqttConnection';
import MqttSubscriberService from '../services/MqttSubscriberService';
import ErrorHandler from '../middlewares/errors/ErrorHandler';
import LoginRouter from '../routes/LoginRouter';
import DeviceRouter from '../routes/DeviceRouter';
import StatusRouter from '../routes/StatusRouter';
import ConsumptionRouter from '../routes/ConsumptionRouter';

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

const loginRouter = new LoginRouter();
const deviceRouter = new DeviceRouter();
const statusRouter = new StatusRouter();
const consumptionRouter = new ConsumptionRouter();

const indexRouter = Router().get('/', (req: Req, res: Res) => {
  if (hasError == 'DB_ERROR') {
    return res.status(NO_CONNECTION_DB.statusCode).json({ message: `${NO_CONNECTION_DB.message}` });
  }
  if (hasError == 'MQTT_ERROR') {
    return res.status(NO_CONNECTION_MQTT.statusCode).json({ message: `${NO_CONNECTION_MQTT.message}` });
  }
  return res.json({ message: 'Smart plug server' });
});
app.addRouter(indexRouter);
app.addRouter(loginRouter.router);
app.addRouter(deviceRouter.router);
app.addRouter(statusRouter.router);
app.addRouter(consumptionRouter.router);

app.addErrorHandler(ErrorHandler.handle);

const port = process.env.PORT || 3000;
app.startServer(`${port}`);

export default app;
