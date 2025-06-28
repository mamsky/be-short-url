import env from 'dotenv';
env.config();
import mongoose from 'mongoose';

export const connect = async () => {
  const db = process.env.MONGODB_URL as string;
  try {
    await mongoose.connect(db);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(error);
  }
};
