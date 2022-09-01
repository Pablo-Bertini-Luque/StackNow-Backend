import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Question = Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: [true, "The category is required"],
    unique: [true, "This category already exists"],
  },
  topic: {
    type: String,
    required: [true, "The topic is required"],
    unique: [true, "This topic already exists"],
  },
  message: {
    type: String,
    required: [true, "This message is required"],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

export default model("question", Question);
