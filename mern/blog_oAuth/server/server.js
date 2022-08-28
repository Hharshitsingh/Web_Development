import express from 'express';
import cors from 'cors';
import passport from "passport";
import dotenv from "dotenv";
import session from 'express-session';
import router from './routes/router.js';
import { Database } from "./database/database.js";
import bodyParser from "body-parser";


dotenv.config();

const app = express();

app.use(
    session({
        secret: "Our little secret.",
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());



app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
);

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));



app.use("/", router);

app.listen(4000, function () {
    console.log("Server started on port 4000");
}
);

Database();