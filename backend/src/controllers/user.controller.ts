import { Request, Response } from "express";
import UserModel from "../models/user.model";

const userRegistration = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "user already exists!!" });
    }
    user = new UserModel(req.body);
    await user.save();
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong!!" });
  }
};

export const userControllers = {
  userRegistration,
};
