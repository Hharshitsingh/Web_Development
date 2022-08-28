import express from 'express';
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import passpostgoogleoauth20 from "passport-google-oauth20";
import findOrCreate from "mongoose-findorcreate";
import { Database } from "./database/database.js";


const GoogleStrategy = passpostgoogleoauth20.Strategy;

dotenv.config();

const app = express();

app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
// mongoose.connect('mongodb://127.0.0.1:27017/projectDB', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);

        User.findOrCreate({ googleId: profile.id, username: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.get("/auth/google", (req, res) => {
    passport.authenticate("google", { scope: ["profile"] })(req, res);
});

app.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
    function (req, res) {
        // Successful authentication, redirect secrets.
        res.redirect("http://localhost:3000/home");
        // return res.status(200).json({
        //     message: "Successfully authenticated",
        //     user: req.user
        // });
    }
);

app.get("/logout", function (req, res) {
    res.redirect("http://localhost:3000/");
});

app.listen(4000, function () {
    console.log("Server started on port 4000");
}
);

Database();