import mongoose from "mongoose";
const Schema = mongoose.Schema;

const voteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    vote: { type: Number, required: true },
  },
  { _id: false }
);

export default voteSchema;
