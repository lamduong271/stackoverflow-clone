require("dotenv").config({ path: "./config.env" });
import express from "express";
import { json } from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./config/mongoConfig";

const app = express();
app.use(json());
app.use(cors());
connectDB();

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
