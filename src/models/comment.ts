import mongoose, { isObjectIdOrHexString } from "mongoose";
const Schema = mongoose.Schema;

const Comment = mongoose.model(
  "Comment",
  new Schema({
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: { type: String, required: true },
    created: { type: Date, default: Date.now },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: false,
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: "Answer",
      required: false,
    },
  })
);

export default Comment;
