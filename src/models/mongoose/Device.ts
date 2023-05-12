import mongoose from 'mongoose';
import { TDevice } from '../../utils/types/TDevice';

const DeviceSchema = new mongoose.Schema<TDevice>({
  deviceId: { type: Number, required: true },
  name: { type: String, required: true },
  userId: { type: Number, required: true }
}, { versionKey: false });

const Device = mongoose.model('Device', DeviceSchema);

export default Device;