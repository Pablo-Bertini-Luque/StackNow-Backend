import Answer from "../models/Answer.js";
import { check } from "express-validator";

const verifyMessageAnswer = check(
  "message",
  "The message must contain a minimum of 10 characters."
).isLength({ min: 10 });

const answerById = check("id").custom(async (id) => {
  const existAnswer = await Answer.findById(id);
  if (!existAnswer) {
    throw new Error(`El id ${id} no existe`);
  }
});

export { verifyMessageAnswer, answerById };
