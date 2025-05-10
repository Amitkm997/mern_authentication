import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
const app = express();
dotenv.config();

app.use(express.json());

app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => console.log(err));

app.use("/", userRoutes);

app.listen(process.env.PORT, () => {
  console.log("server running on port 5000");
});
