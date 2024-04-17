import express from "express";
import { userControllers } from "../controllers/user.controller";

const router = express.Router();

router.post("/register", userControllers.userRegistration);
