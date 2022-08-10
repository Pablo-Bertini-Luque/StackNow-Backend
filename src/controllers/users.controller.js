import User from "../models/User.js";
import usersHelpers from "../helpers/users.helpers.js";


const getAllUsers = (_req, res) => {
    return res.send("getAll")
}

const signupUser = async (req, res) => {
    const {password, ...payload} = req.body;
    try {
        payload.password = usersHelpers.hashPass(password); //Encriptar la contraseña con la función hashPass que está en users.helpers.js
        const newUser = await User.create(payload);
        return (res.status(201).json({message: 'User Created', newUser}));
    } catch (error) {
        return (res.status(400).json({message: 'User Not Created', error}));
    }
}


export {
    getAllUsers,
    signupUser
}