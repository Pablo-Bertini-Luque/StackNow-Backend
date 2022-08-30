import Router from "express";
import { check } from "express-validator";
import {
  crearQuestion,
  getAllQuestion,
} from "../controllers/question.controller.js";
import { isAutenticated } from "../middlewares/users.middlewares.js";
import validResult from "../middlewares/commons.js";
import { validNewQuestion } from "../middlewares/question.middlewares.js";

const routerQuestion = Router();

routerQuestion.get("/", getAllQuestion);

routerQuestion.post(
  "/",
  [isAutenticated, validNewQuestion],
  validResult,
  crearQuestion
);

export { routerQuestion };
