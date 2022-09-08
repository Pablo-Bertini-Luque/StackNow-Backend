import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Answer = Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: "question",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
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
});

Answer.methods.toJson = function () {
  const { __v, status, ...answer } = this.ObjectId();
  return answer;
};

export default model("answer", Answer);
