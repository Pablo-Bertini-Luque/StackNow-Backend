import Router from "express";
import {
  NewQuestion,
  getQuestionId,
  deleteQuestion,
  getAllQuestion,
} from "../controllers/question.controller.js";
import { isAutenticated, validId } from "../middlewares/users.middlewares.js";
import validResult from "../middlewares/commons.js";
import {
  AdminRole,
  questionExists,
  validNewQuestion,
} from "../middlewares/question.middlewares.js";

const routerQuestion = Router();

routerQuestion.get("/", getAllQuestion);

routerQuestion.get(
  "/:id",
  [validId, questionExists, validResult],
  getQuestionId
);

routerQuestion.post(
  "/",
  [isAutenticated, validNewQuestion, validResult],
  NewQuestion
);

routerQuestion.delete(
  "/:id",
  [isAutenticated, AdminRole, validResult],
  deleteQuestion
);

export { routerQuestion };
