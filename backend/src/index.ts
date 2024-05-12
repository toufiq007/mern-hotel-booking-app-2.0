import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../config/dbconfig";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import "dotenv/config";

// dotenv.config();

connectDB();

const app = express();

// all middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// all routes
app.use("/api/users/", userRoutes);
app.use("/api/auth/", authRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on port 3000");
});
