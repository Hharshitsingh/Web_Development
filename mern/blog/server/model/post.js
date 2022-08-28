import mongoose from "mongoose";

const postScheme = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", postScheme);

export default Post;