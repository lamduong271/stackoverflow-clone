import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Vote = mongoose.model(
  "Vote",
  new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    answer: { type: Schema.Types.ObjectId, ref: "Answer" },
    type: String,
  })
);

export default Vote;
