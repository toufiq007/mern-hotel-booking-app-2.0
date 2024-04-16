import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:vfqxBmAdlqTxGYFn@cluster0.hipbwze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log("db connected");
  } catch (err) {
    console.log(err);
  }
};
