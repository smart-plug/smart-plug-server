import dotenv from 'dotenv';
import App from './App';
import Router from 'express';
import { Request as Req, Response as Res } from 'express';

dotenv.config();

const app = new App();

const port = process.env.PORT || 3000;

const indexRouter = Router().get('/', (req: Req, res: Res) => {
  res.json({ message: 'Hello World!' });
});

app.addRouter(indexRouter);

app.startServer(`${port}`);

export default app;
