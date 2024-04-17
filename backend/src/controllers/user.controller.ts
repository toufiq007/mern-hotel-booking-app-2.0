import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";

const userRegistration = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "user already exists!!" });
    }
    user = new UserModel(req.body);
    await user.save();

    // create a jwt token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );
    // set this token to cookies
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.status(200).json({ message: "registration successfull" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong!!" });
  }
};

export const userControllers = {
  userRegistration,
};
