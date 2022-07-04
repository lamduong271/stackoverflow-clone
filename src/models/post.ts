import mongoose, { Schema } from "mongoose";
import answerSchema from "./answer";
import commentSchema from "./comment";
import voteSchema from "./vote";

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: String,
    textBody: String,
    created: { type: Date, default: Date.now },
    votes: [voteSchema],
    image: String,
    comments: [commentSchema],
    answers: [answerSchema],
  })
);
export default Post;
