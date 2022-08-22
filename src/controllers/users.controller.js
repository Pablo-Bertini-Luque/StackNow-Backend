import User from "../models/User.js";
import usersHelpers from "../helpers/users.helpers.js";

const signupUser = async (req, res) => { //Registrar usuario 
    const {password, ...payload} = req.body;
    try {
        payload.password = usersHelpers.hashPass(password); //Encriptar la contraseña con la función hashPass que está en users.helpers.js
        const newUser = await User.create(payload);
        return (res.status(201).json({message: 'User Created', newUser}));
    } catch (error) {
        return (res.status(400).json({message: 'User Not Created', error}));
    }
}

const getAllUsers = async (_req, res) => { //Listar todos los usuarios
    try {
        const allUsers = await User.find(); //Nos retorna todos los usuarios de el documento 'users' en la db
        return res.status(200).json({
            allUsers
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({
                message: 'User not found'
            })
        }else{
            return res.status(200).json({
                user
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const login = async (req, res)=>{
    //if(!req.body.email) return res.status(200).json({success: false, error: 'Not email'});
    //if(!req.body.password) return res.status(200).json({success: false, error: 'Not pass'});
    try {
        const userExists = await User.findOne({email: req.body.email});
        if(!userExists){
            return res.status(401).json({
                message: 'Incorrect credentials'
            });
        } //Verificamos que el usuario exista en la db, buscándolo mediante su email
        const match = usersHelpers.matchPass(userExists.password, req.body.password); //Nos traemos el helper para comparar la password con el hash de la db
        if(!match){
            return res.status(401).json({
                message: 'Incorrect credentials',
                match
            }); //Si bcrypt detecta que el la contraseña no coincide con el hash retornamos error 401
        }else{
            const accessToken = usersHelpers.generateJwt(userExists._id, userExists.email, userExists.name); //Helper que genera y retorna el JWT
            const {token} = accessToken
            return res.status(200).json({match, token});
        }//devolvemos un json con match en true y el token 
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

const currentUser = async (req, res) => { //Traer perfil de usuario mediante los datos del JWT
    if(!req.user) return res.status(200).json({success: false, user: null});
    return await User.findById(req.user.id).then(
        user => {
            res.status(200).json({success: true, data: user});
        }
    ).catch(
        error => {
            res.status(200).json({success: false, error});
    });
}

export {
    getAllUsers,
    getUserById,
    signupUser,
    login,
    currentUser
}