import axios from 'axios';

const URL = 'http://localhost:8000';
export const getArticles = async (page, size=10) => {
    try {
        return await axios.get(`${URL}/getNews?page=${page}&size=${size}`);
    } catch (error) {
        console.log(error);
    }
}
