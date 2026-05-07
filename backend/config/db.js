import mongoose from "mongoose";
import env from "../lib/env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;