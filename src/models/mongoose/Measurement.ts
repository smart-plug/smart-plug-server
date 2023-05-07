import mongoose from 'mongoose';
import TMeasurement from '../../utils/types/TMeasurement';

const MeasurementSchema = new mongoose.Schema<TMeasurement>({
  device_id: { type: Number, required: true },
  current: { type: Number, required: true },
  voltage: { type: Number, required: true },
  reading: { type: Date, required: true }
}, { versionKey: false });

const Measurement = mongoose.model('Measurement', MeasurementSchema);

export default Measurement;