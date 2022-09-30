import express from 'express';
import { getNews} from '../controller/news-controller.js';

const Router = express.Router();

Router.get('/getNews', getNews);

export default Router;