import mongoose from "mongoose";
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  textBody: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export default commentSchema;
