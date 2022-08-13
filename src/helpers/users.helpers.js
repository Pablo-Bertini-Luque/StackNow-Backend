import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const hashPass = (password) => { //Encriptar contraseña con BcryptJS
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const matchPass = (hash, password) => { //Comparamos la contrasena con el hash en la db
    const match = bcrypt.compareSync(password, hash);
    return match;
}

const generateJwt = (id, email, name)=>{ //Generamos el JWT
    const token = jwt.sign(
        {
            id: id,
            email: email,
            name: name
        }, process.env.JWT_SECRET,
        {
            expiresIn: 60 * 60 * 24 //El token tiene un tiempo de expiracion de 24hs
        }
    );
    //console.log(process.env.JWT_SECRET);
    //console.log(token);
    return {token}
}


export default {
    hashPass,
    matchPass,
    generateJwt
}