import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Vote = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    vote: { type: Number, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post" },
    answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  },
  { _id: false }
);

export default Vote;
