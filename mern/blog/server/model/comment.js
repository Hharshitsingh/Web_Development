import mongoose from "mongoose";

const commnetScheme = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    postUsername: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model("Comment", commnetScheme);

export default Comment;