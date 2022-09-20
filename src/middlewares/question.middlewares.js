import Question from "../models/Question.js";
import { check } from "express-validator";
import User from "../models/User.js";

const verifyCategory = check("category").isMongoId();

const verifyTopic = check(
  "topic",
  "The topic must contain a minimum of 5 characters and a maximum of 50."
).isLength({ min: 5, max: 50 });

const questionExists = check("topic").custom(async (topic) => {
  const questionFound = await Question.findOne({ topic });
  if (questionFound) {
    throw new Error("Topic already exists");
  }
}); //Verificar que el topico no exista en la db

const validMessageLength = check(
  "message",
  "The message must contain a maximum of 1000."
).isLength({ max: 1000 }); //Verificar longitud del mensaje

const AdminRole = async (req, res, next) => {
  const { user } = req;
  const { role } = await User.findById(user.id);
  if (role !== "super-admin" && role !== "admin") {
    return res.status(401).json({
      msg: `${user.name} no tiene permiso para hacer esto`,
    });
  }
  next();
};

const validNewQuestion = [
  verifyCategory,
  verifyTopic,
  questionExists,
  validMessageLength,
];

export { validNewQuestion, questionExists, AdminRole };
