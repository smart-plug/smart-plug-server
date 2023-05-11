import mongoose from 'mongoose';
import TStatus from '../../utils/types/TStatus';

const StatusSchema = new mongoose.Schema<TStatus>({
  deviceId: { type: Number, required: true },
  state: { type: Boolean, required: true }
}, { versionKey: false });

const Status = mongoose.model('Status', StatusSchema);

export default Status;