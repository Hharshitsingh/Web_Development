import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const db = async() => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
        console.log("Connected to MongoDB");
        return db;
    } catch (err) {
        console.log("error in coonection" ,err);
    }
}

export default db;
