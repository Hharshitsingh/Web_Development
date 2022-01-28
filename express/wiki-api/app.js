const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wiki", { useNewUrlParser: true })

const artcleSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", artcleSchema);


app.route("/articles")
    .get((req, res) => {
        Article.find({}, (err, foundArticles) => {
            if (!err) {
                res.send(foundArticles);
            } else {
                res.send(err);
            }
        });
    })
    .post((req, res) => {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save((err) => {
            if (!err) {
                res.send({
                    status: "success",
                    message: "Article saved successfully"
                });
            } else {
                res.send(err);
            }
        });
    })
    .delete((req, res) => {
        Article.deleteMany((err) => {
            if (!err) {
                res.send({
                    status: "success",
                    message: "Articles deleted successfully"
                });
            } else {
                res.send(err);
            }
        });
    });

app.route("/articles/:articleID")
    .get((req, res) => {
        Article.findById(req.params.articleID, (err, foundArticle) => {
            if (!err) {
                res.send(foundArticle);
            } else {
                res.send(err);
            }
        });
    })
    .put((req, res) => {
        Article.findByIdAndUpdate(req.params.articleID, {
            title: req.body.title,
            content: req.body.content
        }, (err, updatedArticle) => {
            if (!err) {
                res.send({
                    status: "success",
                    message: "Article updated successfully"
                });
            } else {
                res.send(err);
            }
        });
    })
    .patch((req, res) => {
        Article.findByIdAndUpdate(req.params.articleID, req.body, (err, updatedArticle) => {
            if (!err) {
                res.send({
                    status: "success",
                    message: "Article updated successfully"
                });
            } else {
                res.send(err);
            }
        });
    })
    .delete((req, res) => {
        Article.findByIdAndDelete(req.params.articleID, (err) => {
            if (!err) {
                res.send({
                    status: "success",
                    message: "Article deleted successfully"
                });
            } else {
                res.send(err);
            }
        });
    });




app.listen(3000, () => { console.log("Server started at port 3000") });