import mongoose from "mongoose";

export const Database = () => {
    const url = 'mongodb://127.0.0.1:27017/projectDB?retryWrites=true&w=majority';
    try {
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
}