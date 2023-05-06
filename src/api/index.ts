import dotenv from 'dotenv';
import App from './App';
import mongoose from 'mongoose';
import { NO_CONNECTION_DB } from '../utils/errors/errorsList';

import Router from 'express';
import { Request as Req, Response as Res } from 'express';

dotenv.config();

let hasError = 'NO_ERROR';

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.uheqdom.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
  .catch(error => {
    hasError = 'DB_ERROR';
    console.error(error);
  });

const app = new App();

const indexRouter = Router().get('/', (req: Req, res: Res) => {
  if (hasError == 'DB_ERROR') {
    return res.status(NO_CONNECTION_DB.statusCode).json({ message: `${NO_CONNECTION_DB.message}` });
  }
  return res.json({ message: 'Hello World!' });
});
app.addRouter(indexRouter);

const port = process.env.PORT || 3000;
app.startServer(`${port}`);

export default app;
