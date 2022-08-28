import passport from "passport";
import passpostgoogleoauth20 from "passport-google-oauth20";

const GoogleStrategy = passpostgoogleoauth20.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "auth/google/callback",
    scope: ["profile", "email"],
}, (accessToken, refreshToken, profile, done) => {
    callback(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
}
);
passport.deserializeUser((user, done) => {
    done(null, user);
});