import Router from "express";
import { check } from "express-validator";
import {
  NewQuestion,
  deleteQuestion,
  getAllQuestion,
} from "../controllers/question.controller.js";
import { isAutenticated } from "../middlewares/users.middlewares.js";
import validResult from "../middlewares/commons.js";
import {
  AdminRole,
  validNewQuestion,
} from "../middlewares/question.middlewares.js";

const routerQuestion = Router();

routerQuestion.get("/", getAllQuestion);

routerQuestion.post(
  "/",
  [isAutenticated, validNewQuestion, validResult],
  NewQuestion
);

routerQuestion.delete(
  "/",
  [isAutenticated, AdminRole, validResult],
  deleteQuestion
);

export { routerQuestion };
