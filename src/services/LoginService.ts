import { USER_INVALID_PASSWORD, USER_NOTFOUND } from '../utils/errors/errorsList';
import { TUser, TLogin, TUserPublic } from '../utils/types/TUser';
import { Model } from 'mongoose';
import User from '../models/mongoose/User';

export default class LoginService {
  private _model: Model<TUser>;

  constructor(model: Model<TUser> = User) {
    this._model = model;
  }

  public login = async ({ username, password }: TLogin): Promise<TUserPublic> => {
    const user = await this._model.findOne({ username: username });

    if (!user) {
      throw USER_NOTFOUND;
    }

    if (user.password != password) {
      throw USER_INVALID_PASSWORD;
    }

    const userPublic : TUserPublic = {
      userId: user.userId,
      name: user.name,
      username: user.username
    };

    return userPublic;
  };
}
