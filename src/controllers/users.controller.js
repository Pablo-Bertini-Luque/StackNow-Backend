import User from "../models/User.js";

const getAllUsers = (_req, res) => {
    return res.send("getAll")
}

const signupUser = async (req, res) => {
    const payload = req.body;
    try {
        const user = new User(payload);
        await user.save();
        return (res.status(201).json({message: 'User Created', body: payload}));
    } catch (error) {
        return (res.status(400).json({message: 'User Not Created', error}));
    }
    
}
export {
    getAllUsers,
    signupUser
}