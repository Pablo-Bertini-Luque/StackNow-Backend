import validator from "express-validator";
import validResult from "./commons.js";

const {check} = validator;

const verifyIfIsEmail = check('email', 'Incorrect Email Format').isEmail(); //Verificar que el email sea un email

const validPassLength = check('password', 'The password must be at least 5 characters long.').isLength({min: 5}); //Verificar que la contraseña tenga al menos 5 caracteres

export {
    verifyIfIsEmail,
    validPassLength,
    validResult
}