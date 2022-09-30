import data from './constant/data.js';
import News from './model/news.js';

const DefaultData = async() => {
    try{
        // await News.deleteMany({});
        await News.insertMany(data);
        console.log("Data inserted successfully");
    }
    catch(err){
        console.log("error in coonection" ,err.message);
    }
}

export default DefaultData;