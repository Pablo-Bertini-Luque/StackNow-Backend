import { Router } from "express";
import {
  currentUser,
  getAllUsers,
  getUserById,
  login,
  signupUser,
  updateUser,
} from "../controllers/users.controller.js";
import {
  getIdValidations,
  logInUserValidations,
  signupUserValidations,
  isAutenticated,
} from "../middlewares/users.middlewares.js";
import upload from "../lib/storage.js";

const userRouter = Router();

userRouter.route("/list").get(isAutenticated, getAllUsers);

userRouter.route("/list/:id").get(getIdValidations, getUserById);

userRouter.route("/signup").post(signupUserValidations, signupUser);
userRouter.route("/login").post(logInUserValidations, login);
userRouter
  .route("/current")
  .post(isAutenticated, upload.single("image"), currentUser);
userRouter
  .route("/update")
  .post(isAutenticated, upload.single("image"), updateUser);

export default userRouter;
