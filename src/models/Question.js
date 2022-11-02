import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Question = Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "categories",
    required: true,
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
  answer: {
    type: String,
    default: "",
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

Question.methods.toJson = function () {
  const { __v, status, ...question } = this.ObjectId();
  return question;
};

export default model("question", Question);
