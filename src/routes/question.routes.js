import Router from "express";
import {
  NewQuestion,
  deleteQuestion,
  getAllQuestion,
  getQuestionByCategory,
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

routerQuestion.get("/:id", getQuestionByCategory); //Se pasa el id de la categoría

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
