import mongoose from 'mongoose';
import { TUser } from '../../utils/types/TUser';

const UserSchema = new mongoose.Schema<TUser>({
  user_id: { type: Number, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
}, { versionKey: false });

const User = mongoose.model('User', UserSchema);

export default User;