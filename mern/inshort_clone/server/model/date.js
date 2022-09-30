import mongoose from "mongoose";

const DateSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    }
});

const Dates = mongoose.model("TimeStamp", DateSchema);

export default Dates;