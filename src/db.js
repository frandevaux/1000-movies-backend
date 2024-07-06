import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};
