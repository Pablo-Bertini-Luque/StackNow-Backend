import mongoose from "mongoose";
const { Schema, model } = mongoose;

const Question = Schema({
  topic: {
    type: String,
    required: [true, "User name is required"], //¿Como poner un límite a una cantidad de palabras?
    unique: [true, "This topic already exists"],
  },
  message: {
    type: String,
    required: [true, "This message is required"], //¿Como poner un límite a una cantidad de palabras?
    unique: [true, "This email already exists"],
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
