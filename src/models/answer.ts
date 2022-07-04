import mongoose from "mongoose";
const Schema = mongoose.Schema;

const voteSchema = require("./vote");
const commentSchema = require("./comment");

const answerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: { type: Date, default: Date.now },
  textBody: { type: String, required: true },
  score: { type: Number, default: 0 },
  votes: [voteSchema],
  comments: [commentSchema],
});

export default answerSchema;
