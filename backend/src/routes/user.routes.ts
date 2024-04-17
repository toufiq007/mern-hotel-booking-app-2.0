import express from "express";
import { userControllers } from "../controllers/user.controller";
import { check } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    check("firstName")
      .notEmpty()
      .withMessage("First Name is required")
      .isString(),
    check("lastName")
      .notEmpty()
      .withMessage("Last Name is required")
      .isString(),
    check("email").notEmpty().withMessage("Email Name is required").isEmail(),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 or more characters"),
  ],
  userControllers.userRegistration
);

export default router;
