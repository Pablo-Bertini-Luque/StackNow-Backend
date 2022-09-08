import { Router } from "express";
import {
  deleteAnswer,
  getAnswersByCategory,
  NewAnswer,
  updateAnswer,
} from "../controllers/answer.controller.js";
import {
  answerById,
  verifyMessageAnswer,
} from "../middlewares/answer.middlewares.js";
import validResult from "../middlewares/commons.js";
import { validId } from "../middlewares/users.middlewares.js";
import { isAutenticated } from "../middlewares/users.middlewares.js";
import { AdminRole } from "../middlewares/question.middlewares.js";

const routerAnswer = Router();

routerAnswer.get("/:id", [validId, validResult], getAnswersByCategory);

routerAnswer.post(
  "/",
  [isAutenticated, verifyMessageAnswer, validResult],
  NewAnswer
);

routerAnswer.put(
  "/:id",
  [isAutenticated, validId, verifyMessageAnswer, validResult],
  updateAnswer
);

routerAnswer.delete(
  "/:id",
  [isAutenticated, validId, answerById, AdminRole, validResult], //Ver tema del adminRole
  deleteAnswer
);

export { routerAnswer };
