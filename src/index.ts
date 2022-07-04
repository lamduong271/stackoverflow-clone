import express from "express";
import { json } from "body-parser";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
