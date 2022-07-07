require("dotenv").config({ path: "./config.env" });
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/mongoConfig";
import userRouter from "./routes/user.router";
import portRouter from "./routes/post.router";

const app = express();
app.use(json());
app.use(cors());
connectDB();
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use("/auth", userRouter);
app.use("/question", portRouter);
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
