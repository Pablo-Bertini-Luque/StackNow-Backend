import Question from "../models/question.js";

const NewQuestion = async (req, res) => {
  const category = req.body.category;
  const topic = req.body.topic;
  const message = req.body.message;
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
    user: req.user._id,
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
    Question.find(query).populate("user", "name"),
  ]);
  res.json({ total, questions });
};

const getQuestionId = async (req, res) => {
  const { id } = req.params;
  const question = Question.findById(id)
    .populate("user", "name")
    .populate("category", "name");
  return res.json(question);
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findByIdAndUpdate(id, { estado: false });
  res.json(question);
};

export { NewQuestion, getAllQuestion, getQuestionId, deleteQuestion };
