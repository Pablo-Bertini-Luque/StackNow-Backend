import mongoose from "mongoose";
const {Schema, model} = mongoose;

const User = Schema({
    name: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        required: [true, 'Email name is required'],
        unique: [true, 'This email already exists']
    },
    password: {
        type: String,
        required: [true, 'Password name is required']
    },
    role: {
        type: String,
        enum: ['admin', 'client'],
        default: 'client',
        required: [true, 'The role is required']
    }
    
},
{
    timestamps: true,
});

export default model('users', User);