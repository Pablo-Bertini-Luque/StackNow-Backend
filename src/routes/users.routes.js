import { Router } from "express";
import {getAllUsers, signupUser} from "../controllers/users.controller.js";

const userRouter = Router();

userRouter
    .route("/list")
    .get(getAllUsers)
    .post()
userRouter
    .route("/signup")
    .get()
    .post(signupUser)
userRouter
    .route("/login")
    .get()
    .post()


export default userRouter; 