import "dotenv/config";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const User = Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email name is required"],
      unique: [true, "This email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password name is required"],
    },
    role: {
      type: String,
      enum: ["admin", "client"],
      default: "client",
      required: [true, "The role is required"],
    },
    avatar: {
      type: String,
      default:
        "https://cdn0.iconfinder.com/data/icons/unigrid-flat-human-vol-2/90/011_101_anonymous_anonym_hacker_vendetta_user_human_avatar-512.png",
    },
    active: {
      type: Boolean,
      enum: [true, false],
      default: true,
      required: [true, "The active field is required"],
    },
    deleted: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: [true, "The deleted field is required"],
    },
  },
  {
    timestamps: true,
  }
);

User.methods.toJSON = function () {
  //No enviar el hash ni version al frontend
  const userFields = this.toObject();
  delete userFields.password;
  delete userFields.__v;
  return userFields;
};

User.methods.setAvatar = function setAvatar(filename) {
  const port = process.env.PORT;
  const host = process.env.HOST;
  this.avatar = `${host}:${port}/public/avatars/${filename}`;
};

export default model("users", User);
