import express from "express";
import { check } from "express-validator";
import { userControllers } from "../controllers/user.controller";

const router = express.Router();

router.post(
  "/login",
  [
    check("email").notEmpty().withMessage("email is required").isString(),
    check("password")
      .notEmpty()
      .withMessage("password is requried")
      .isLength({ min: 6 })
      .withMessage("password must be greater than 6"),
  ],
  userControllers.userLogin
);

export default router;
