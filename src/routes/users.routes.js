import { Router } from "express";
import {getAllUsers, signupUser} from "../controllers/users.controller.js";
import { verifyIfIsEmail,validPassLength ,validResult } from "../middlewares/users.middlewares.js";

const userRouter = Router();

userRouter
    .route("/list")
    .get(getAllUsers)
    .post()
userRouter
    .route("/signup")
    .get()
    .post([verifyIfIsEmail, validPassLength, validResult], signupUser)
userRouter
    .route("/login")
    .get()
    .post()


export default userRouter;