import passport from 'passport';
import passpostgoogleoauth20 from "passport-google-oauth20";
import dotenv from "dotenv";
// import User from "../model/user-model.js";
import findOrCreate from "mongoose-findorcreate";
import passportLocalMongoose from "passport-local-mongoose";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';


dotenv.config();

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    googleID: { type: String, require: true, unique: true, sparse: true },
    secret: String,
    name: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);
passport.use(User.createStrategy());

const GoogleStrategy = passpostgoogleoauth20.Strategy;

passport.serializeUser((user, done) => {
    done(null, user.doc.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/google/callback",
    scope: ["profile", "email"],
}, async (accessToken, refreshToken, profile, done) => {

    const { id, displayName, emails } = profile;
    const email = emails[0].value;
    const name = displayName;
    const secret = "secret";
    try {
        const user = await User.findOrCreate({ googleID: id }, { googleID: id, name, email, secret });
        console.log("user");
        console.log(user);
        return done(null, user);
    } catch (error) {
        // console.log(error);
    }
}));

export const userLogin = (req, res) => {
    if (req.user) {
        console.log(req.user.id);
        res.status(200).json({
            message: "Successfully authenticated",
            user: req.user
        });
    } else {
        res.status(401).json({
            message: "Failed to authenticate"
        });
    }
}

export const loginFailed = (req, res) => {
    res.status(401).json({
        message: "Failed to authenticate"
    });
}

export const userLogout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        } else {
            res.redirect('http://localhost:3000/');
        }
    }
    );
}

export const userUpdatePassword = async (req, res) => {
    console.log("test")
    console.log(req.body);
    const id = req.body._id;

    const hashpswd = await bcrypt.hash(req.body.password, 8);;
    console.log(hashpswd);
    User.findByIdAndUpdate(id, { password: hashpswd }, (err, user) => {
        if (err) {
            res.status(500).json({
                message: "Failed to update password"
            });
        } else {
            res.status(200).json({
                message: "Password updated successfully"
            });
        }
    }
    );
}

export const gmailLogin = async (req, res) => {
    console.log("test");
    console.log(req.body);
    const { email, password } = req.body;
    console.log(password);
    console.log(email);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }else if(!user.password){
            return res.status(401).json({
                message: "Login with your Google Account "
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect password"
            });
        }
        res.status(200).json({
            message: "Successfully authenticated",
            user: user
        });
        
    } catch (e) {
        return res.status(500).json({
            message: "Error while logging in user"
        })

    }
}