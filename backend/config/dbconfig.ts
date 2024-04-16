import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
