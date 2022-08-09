import mongoose from "mongoose";
import "dotenv/config"

const db = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to mongodb')
    } catch (error) {
        console.log(error);
        throw new Error('Internal server error: Database cannot connecting');
    }
}

export default db;