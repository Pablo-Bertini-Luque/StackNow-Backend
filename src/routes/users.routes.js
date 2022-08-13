import { Router } from "express";
import {getAllUsers, getUserById, login, signupUser} from "../controllers/users.controller.js";
import { getIdValidations, logInUserValidations, signupUserValidations } from "../middlewares/users.middlewares.js";

const userRouter = Router();

userRouter
    .route("/list")
    .get(getAllUsers)
    .post()
userRouter
    .route("/list/:id")
    .get(getIdValidations, getUserById);
userRouter
    .route("/signup")
    .get()
    .post(
            signupUserValidations, 
            signupUser
        );
userRouter
    .route("/login")
    .get()
    .post(
        logInUserValidations,
        login
        );


export default userRouter;