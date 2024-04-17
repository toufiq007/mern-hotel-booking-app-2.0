import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../config/dbconfig";
import userRoutes from "./routes/user.routes";

dotenv.config();

connectDB();

const app = express();

// all middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// all routes
app.use("/api/users/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on port 3000");
});
