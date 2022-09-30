import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null,
    },
    description: {
        type: String,
        default: null
    },
    author: {
        type: String,
        default: "Anonymous"
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    urlToImage: {
        type: String,
        default: null
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
    }
});

const News = mongoose.model("News", newsSchema);

export default News;
