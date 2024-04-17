import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define the interface for User document
interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for User
const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const hash_password = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Hash the password before saving to the database
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await hash_password(this.password);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.log(error);
  }
});

// Create and export the User model
const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
