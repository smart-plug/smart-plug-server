import dotenv from 'dotenv';
import * as mqtt from 'mqtt';

dotenv.config();

function mqttConnection() {
  const clientId = 'client-' + Math.random().toString(36).substring(7);

  const hostURL = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

  const options: mqtt.IClientOptions = {
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD,
    keepalive: 60,
    clientId: clientId,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000
  };

  const client = mqtt.connect(hostURL, options);

  client.on('error', (err) => {
    client.end();
    throw err;
  });
  return client;
}

export default mqttConnection;