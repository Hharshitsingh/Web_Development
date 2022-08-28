import express from 'express';
import passport from 'passport';
import passpostgoogleoauth20 from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

const GoogleStrategy = passpostgoogleoauth20.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/google/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
}
);
passport.deserializeUser((user, done) => {
    done(null, user);
});

const router = express.Router();

router.get('/login/sucess', (req, res) => {
    console.log("sucess");
    if (req.user) {
        res.status(200).json({
            message: "Successfully authenticated",
            user: req.user
        });
    } else {
        res.status(401).json({
            message: "Failed to authenticate"
        });
    }
});

router.get('/login/failed', (req, res) => {
    res.status(401).json({
        message: "Failed to authenticate"
    });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
    '/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: '/login/failed'
    }),
);

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        } else {
            res.redirect('http://localhost:3000/');
        }
    }
    );
});

export default router;