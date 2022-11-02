import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Answer = Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: "questions",
    required: true,
  },
  message: {
    type: String,
    required: [true, "This message is required"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

Answer.methods.toJson = function () {
  const { __v, status, ...answer } = this.ObjectId();
  return answer;
};

export default model("answers", Answer);
