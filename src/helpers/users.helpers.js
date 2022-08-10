import bcrypt from "bcryptjs";

const hashPass = (password) => { //Encriptar contraseña con BcryptJS
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

export default {
    hashPass,
}