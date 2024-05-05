import express, { Request, Response } from "express";
import { check } from "express-validator";
import { userControllers } from "../controllers/user.controller";
import verifyToken from "../middlewares/auth";

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

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId });
});

router.post("/logout",userControllers.userLogOut)

export default router;
