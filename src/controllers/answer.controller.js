import Answer from "../models/Answer.js";
import Category from "../models/Category.js";

const getAnswersByCategory = async (req, res) => {
  const { id } = req.params;
  const query = { status: true };
  const [total, answer, category] = await Promise.all([
    Category.findById(id),
    Answer.countDocuments(query),
    Answer.find(query).populate("user", "name").populate("category", "name"),
  ]);
  res.json({ total, answer, category });
};

const NewAnswer = async (req, res) => {
  const category = req.category.id;
  const question = req.question.id;
  const user = req.user.id;
  const message = req.body.message;
  //Generar la data a guardar
  const data = {
    category,
    question,
    user,
    message,
  };

  const answer = new Answer(data);

  //Guardar DB
  await answer.save();

  res.status(201).json(answer);
};

//actualizar respuesta
const updateAnswer = async (req, res) => {
  const { id } = req.params;
  const { status, category, question, user, ...data } = req.body;
  const answer = await Answer.findByIdAndUpdate(id, data, { new: true });

  res.json(answer);
};

//borrar categoria -
const deleteAnswer = async (req, res) => {
  const { id } = req.params;
  const answer = await Category.findByIdAndUpdate(id, { status: false });
  res.json(answer);
};

export { getAnswersByCategory, updateAnswer, NewAnswer, deleteAnswer };
