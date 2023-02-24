import News from "../model/news.js";
import dotenv from 'dotenv';

dotenv.config();

export const DefaultData = async (req, res) => {
    let num = 0, newsAPI;
    newsAPI = `https://newsapi.org/v2/top-headlines?country=in&apiKey=d351216229824df1ab8556af095ec4cc`;
    newsAPI = 'https://newsapi.org/v2/top-headlines?country=in&apiKey=d351216229824df1ab8556af095ec4cc'
    newsAPI = 'https://newsapi.org/v2/top-headlines?country=in&from=2022-09-09&to=2022-09-09&apiKey=d351216229824df1ab8556af095ec4cc'

    // entertainment health sports
    // console.log(newsAPI);
    const news = await fetch(newsAPI);
    console.log(news);
    const newsJSON = await news.json();
    if (newsJSON.status === "ok") {
        const newsData = newsJSON.articles;
        newsData.map(async (news) => {
            const url = news.url;
            try {
                let ne = await News.findOne({ url: url });
                if (ne === null) {
                    console.log("news does not exists");
                    let newNews = new News(news)
                    let dta = await newNews.save();
                    if (dta) {
                        num++;
                        console.log(num);
                    } else {
                        
                    }
                    
                } else {
                    console.log("news already exists");
                }
            } catch (err) {
                console.log("line 32", err);
            }
        })
    }
}

export const getNews = async (req, res) => {
    try {
        // console.log(req.query);
        const size = Number(req.query.size);
        const page = Number(req.query.page);
        let data = await News.find({}).sort({ publishedAt: -1 }).limit(size).skip((page) * size);
        // console.log(data);

        return res.status(200).json(data);
    } catch (error) {
        // console.log(error);
    }
}
