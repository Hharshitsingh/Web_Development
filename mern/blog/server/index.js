import express from "express";
import db from "./database/db.js";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";


dotenv.config();

const app = express();

app.use(cors(
    {
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    }
));
app.use(bodyParser.json({ extended: true, limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));
app.use('/', Router);



app.listen(8000, () => {
    console.log("Server is running on port 8000");
})


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

db(USERNAME, PASSWORD);