import Question from "../models/question.js";

const crearQuestion = async (req, res) => {
  const message = req.body.message;
  const topic = req.body.topic.toUpperCase();
  const topicDB = await Question.findOne({ topic });
  if (topicDB) {
    return res.status(400).json({
      msg: `El asunto ${topicDB.topic} ya existe`,
    });
  }
  //Generar la data a guardar
  const data = {
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
  //Listar todos las preguntas
  try {
    const allQuestion = await Question.find(); //Nos retorna todos los usuarios de el documento 'users' en la db
    return res.status(200).json({
      allQuestion,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { crearQuestion, getAllQuestion };
