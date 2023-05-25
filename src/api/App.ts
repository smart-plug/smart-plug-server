import express from 'express';
import cors from 'cors';

export default class App {
  private _app: express.Application;

  constructor() {
    this._app = express();
    this._app.use(express.json());
    this._app.use(cors());
  }

  public startServer = (PORT: string | number) =>
    this._app.listen(PORT, () => {
      console.log(`API is listening on PORT ${PORT}.`);
    });

  public addRouter = (router: express.Router): void => {
    this._app.use(router);
  };

  public addErrorHandler = (middleware: express.ErrorRequestHandler): void => {
    this._app.use(middleware);
  };
}
