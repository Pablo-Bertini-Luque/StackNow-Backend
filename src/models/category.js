import mongoose from "mongoose";
import User from "./User.js";
const { Schema, model } = mongoose;

const Category = Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
  },
  status: {
    type: Boolean,
    default: true,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    require: true,
  },
});

Category.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

export default model("categories", Category);
