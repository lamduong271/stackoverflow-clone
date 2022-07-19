import mongoose, { Schema } from "mongoose";
import Answer from "./answer";
import Comment from "./comment";
import Vote from "./vote";

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    textBody: {
      type: String,
      required: true,
    },
    created: { type: Date, default: Date.now },
    votes: [Vote.schema],
    image: String,
    comments: [Comment.schema],
    answers: [Answer.schema],
  })
);
export default Post;
