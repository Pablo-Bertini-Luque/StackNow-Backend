import { Router } from "express";
import {currentUser, getAllUsers, getUserById, login, signupUser} from "../controllers/users.controller.js";
import { getIdValidations, logInUserValidations, signupUserValidations, isAutenticated } from "../middlewares/users.middlewares.js";

const userRouter = Router();

userRouter
    .route("/list")
    .get(isAutenticated, getAllUsers)
    .post(isAutenticated, getAllUsers);
userRouter
    .route("/list/:id")
    .get(getIdValidations, getUserById);

userRouter
    .route("/signup")
    .post(signupUserValidations, signupUser);
userRouter
    .route("/login")
    .post(logInUserValidations, login);
userRouter.route('/current').post(isAutenticated, currentUser)



export default userRouter;