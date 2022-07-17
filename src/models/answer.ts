import mongoose from "mongoose";
import Vote from "./vote";
import Comment from "./comment";
const Schema = mongoose.Schema;

const Answer = mongoose.model(
  "Answer",
  new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    created: { type: Date, default: Date.now },
    textBody: { type: String, required: true },
    score: { type: Number, default: 0 },
    votes: [Vote.schema],
    comments: [Comment.schema],
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  })
);

export default Answer;
