import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './database/db.js';
import Router from './routes/route.js';
import dotenv from 'dotenv';
import { DefaultData } from './controller/news-controller.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true,
        methods: 'GET',
        allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept, Content-Length, Accept-Encoding, X-CSRF-Token, Access-Control-Request-Method, Access-Control-Request-Headers, Origin',
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);
app.get('/news', DefaultData);

app.use('/', Router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// DefaultData();

db();


