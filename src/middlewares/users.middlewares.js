import "dotenv/config";
import validator from "express-validator";
import User from "../models/User.js";
import validResult from "./commons.js";
import jwt from "jsonwebtoken";

const { check } = validator;

const verifyIfIsEmail = check("email", "Incorrect Email Format").isEmail(); //Verificar que el email sea un email
const validPassLength = check(
  "password",
  "The password must be at least 5 characters long."
).isLength({ min: 5 }); //Verificar que la contraseña tenga al menos 5 caracteres
const validEmptyFields = check(
  ["name", "email", "password"],
  "This field cant be empty"
).notEmpty(); //Verificar que los campos no esten vacios
const validEmptyFieldsLogin = check(
  ["email", "password"],
  "This field cant be empty"
).notEmpty();

//Validaciones personalizadas
const userExists = check("email").custom(async (email) => {
  const userFound = await User.findOne({ email });
  if (userFound) {
    throw new Error("Email already exists");
  }
}); //Verificar que el email no exista en la db

const isAutenticated = (req, res, next) => {
  //Middleware para las rutas protegidas, solo son accesibles si el token es correcto
  const access_token = req.headers.access_token;
  if (!access_token) {
    return res
      .status(401)
      .json({ success: false, message: "User is not authorized" });
  }
  const user = (function (token) {
    let user = null;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
    } catch (error) {
      return res.status(501).json({ message: "internal server error", error });
    }
    return user;
  })(access_token);
  if (!user) {
    return res
      .status(401)
      .json({ success: false, message: "User is not authorized" });
  }
  req.user = user;
  next();
};

//Fin validaciones personalizadas

const signupUserValidations = [
  verifyIfIsEmail,
  validPassLength,
  validEmptyFields,
  userExists,
  validResult,
];

const logInUserValidations = [
  verifyIfIsEmail,
  validEmptyFieldsLogin,
  validResult,
];

const validId = check("id", "Incorrect format id").isMongoId(); //Validar que sea un id de mongo
const getIdValidations = [validId, validResult];

export {
  signupUserValidations,
  logInUserValidations,
  getIdValidations,
  isAutenticated,
  validId,
};
