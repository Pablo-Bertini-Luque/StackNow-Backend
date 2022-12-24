import Answer from "../models/Answer.js";
import { check } from "express-validator";

const verifyMessageAnswer = check(
  "message",
  "The message must contain a minimum of 10 characters and maximum of 300 ."
).isLength({ min: 10, max: 300 });

/*const answerById = check("id").custom(async (id) => {
  const existAnswer = await Answer.findById(id);
  if (!existAnswer) {
    throw new Error(`El id ${id} no existe`);
  }
});*/

//const validNewAnswer = [verifyMessageAnswer, answerById];

export { verifyMessageAnswer };
