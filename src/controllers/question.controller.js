import Question from "../models/Question.js";
import { response, request } from "express";

const NewQuestion = async (req, res) => {
  const category = req.body.category;
  const topic = req.body.topic;
  const message = req.body.message;
  const user = req.user.id;
  console.log(req.user);
  const topicDB = await Question.findOne({ topic });
  if (topicDB) {
    return res.status(400).json({
      msg: `El asunto ${topicDB.topic} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
    category,
    topic,
    message,
    user,
  };

  const question = new Question(data);

  //Guardar DB
  await question.save();

  res.status(201).json(question);
};

const getAllQuestion = async (req, res) => {
  const query = { status: true };
  const [total, questions] = await Promise.all([
    Question.countDocuments(query),
    Question.find(query).populate("user", "name").populate("category", "name"),
  ]);
  res.json({ total, questions });
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndUpdate(id, { status: false });
  res.json(question);
};

export { NewQuestion, getAllQuestion, deleteQuestion };
