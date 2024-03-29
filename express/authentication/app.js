require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const fs = require('fs')

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
  secret: "our little secret.",
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleID: { type: String, require: true, index: true, unique: true, sparse: true },
  name: String,
  secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/secrets",
  userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleID: profile.id }, function (err, user) {
      return cb(err, user);
    });
    // User.findOne({'googleID':profile.id}, (err, user) => {
    //   if(err){
    //     console.log("in error section")
    //     console.log(err)
    //     // return cb(err);
    //   }
    //   else if(!user){
    //     console.log("else if section")
    //     const user = new User({
    //       googleID: profile.id, 
    //       name: profile.displayName
    //     }); 
    //     console.log(user);
    //     user.save((err) => {
    //       if(err){
    //         console.log("user creted err")
    //         console.log(err)
    //       }else{
    //         console.log(user)
    //         return cb(err, user);
    //       }
    //     })
    //   }else{
    //     console.log("else section");
    //     return cb(err, user);
    //   }
    // })

  }
));

app.get("/", (req, res) => {
  res.render("home", {
    title: "Welcome to the blog",
  });
});

app.get("/auth/google", (req, res) => {
  passport.authenticate('google', { scope: ['profile'] })(req, res);
})

app.get('/auth/google/secrets',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/secrets');
  });

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
  });
});

app.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

app.get("/secrets", (req, res) => {
  User.find({"secret:": {$ne: null}}, (err, foundUser) => {
    if(err){
      console.log(err)
    }else{
      if(foundUser){
        console.log(foundUser);
        res.render('secrets', {usersWithSecrets: foundUser})
      }
    }
  })
})

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/login");
  }
});

app.post("/register", (req, res) => {
  User.register({ username: req.body.username }, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect('/secrets')
      })
    }
  })
});

app.post("/login", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect('/secrets');
      })
    }
  })
});

app.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/');
})

app.get('/submit', (req, res) => {
  if(req.isAuthenticated()){
    res.render('submit', );
  }else{
    res.redirect('/login');
  }
})

app.post('/submit', (req, res) => {
  const submitsecret = req.body.secret;
  User.findById(req.user.id, (err, foundUser) => {
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        foundUser.secret = submitsecret;
        foundUser.save((err) => {
          if(err){
            console.log(err);
          }else{
            res.redirect('/secrets');
          }
        }
        );
      }
    }
  });
})

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
