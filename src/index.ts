require("dotenv").config({ path: "./.env" });
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/mongoConfig";
import userRouter from "./routes/user.router";
import portRouter from "./routes/post.router";
import commentRouter from "./routes/comment.router";
import voteRouter from "./routes/vote.router";
import answerRouter from "./routes/answer.router";

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
app.use("/comment", commentRouter);
app.use("/vote", voteRouter);
app.use("/answer", answerRouter);

app.set("port", process.env.PORT || 3000); // Process.env.PORT change automatically the port IF 3000 port is being used.
app.listen(app.get("port"), () =>
  console.log(`Node server listening on port ${app.get("port")}!`)
);
