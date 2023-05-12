import { USER_NOTFOUND } from '../utils/errors/errorsList';
import { TUser, TUserPublic } from '../utils/types/TUser';
import { Model } from 'mongoose';
import User from '../models/mongoose/User';

export default class UserService {
  private _model: Model<TUser>;

  constructor(model: Model<TUser> = User) {
    this._model = model;
  }

  public get = async (userId : number): Promise<TUserPublic> => {
    const user = await this._model.findOne({ userId: userId });

    if (!user) {
      throw USER_NOTFOUND;
    }

    const userPublic : TUserPublic = {
      userId: user.userId,
      name: user.name,
      username: user.username
    };

    return userPublic;
  };
}
