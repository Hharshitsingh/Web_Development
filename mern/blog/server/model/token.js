import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;