import { Request, Response } from "express";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { generateNewJWT } from "../../utils/generateJWT";

const userRegistration = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "user already exists!!" });
    }
    user = new UserModel(req.body);
    await user.save();

    // create a jwt token
    const token = generateNewJWT(user.id);
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

const userLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "invalid user" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "invalid user" });
    }
    if (email === user.email && passwordMatch) {
      const token = generateNewJWT(user.id);
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      return res
        .status(200)
        .json({ message: "logineed successfull", userId: user._id });
    }
  } catch (err) {
    console.log(err);
  }
};

export const userControllers = {
  userRegistration,
  userLogin,
};
