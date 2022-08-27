import Router from "express";
import { check } from "express-validator";
import validResult from "../middlewares/commons.js";

const routerQuestion = Router();

const respuesta = async (req, res) => {
  await res.json({
    msg: "Esto es una pregunta",
  });
};

routerQuestion.get("/", respuesta);

export { routerQuestion };
