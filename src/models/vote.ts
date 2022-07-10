import mongoose from "mongoose";
const Schema = mongoose.Schema;

export enum Direction {
  Up = "UP",
  Down = "DOWN",
}

const Vote = mongoose.model(
  "Vote",
  new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    answer: { type: Schema.Types.ObjectId, ref: "Answer" },
    type: Direction,
  })
);

export default Vote;
