import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cms';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI)
      .then(() => {
        console.log("MongoDB connected")
      })
  } catch (e) {
    console.error('MongoDB connection error');
    process.exit(1);
  }
};