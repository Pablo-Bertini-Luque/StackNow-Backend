import mongoose from "mongoose";
import User from "./User.js";
const { Schema, model } = mongoose;

const Category = Schema({
  name: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  status: {
    type: Boolean,
    default: true,
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: User,
    require: true,
  },
});

Category.methods.toJSON = function () {
  const { __v, status, ...data } = this.toObject();
  return data;
};

export default model("category", Category);
