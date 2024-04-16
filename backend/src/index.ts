import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "../config/dbconfig";

dotenv.config();

connectDB();

const app = express();

// all middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/test", async (req, res) => {
  res.json({
    message: "hello from backend server",
  });
});

app.listen(process.env.PORT, () => {
  console.log("server running on port 3000");
});
