import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.uheqdom.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
};

export default connectDB;