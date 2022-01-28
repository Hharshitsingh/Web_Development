const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

})

app.post('/', (req, res) => {
    const cityname = req.body.cityname;
    const query = cityname;
    const apiKey = "62245419a5cef94331688c8e6f0e9154";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;

    https.get(url, (response)=>{
        console.log(response.statusCode);

        response.on('data', (data)=>{
            const weaterData = JSON.parse(data);
            const temp = weaterData.main.temp;
            const city = weaterData.name;
            const desc = weaterData.weather[0].description;
            const icon = weaterData.weather[0].icon;
            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            
            res.write(`<h1>The weather in ${city} is ${desc} and the temperature is ${temp}</h1>`);
            res.write(`<img src="${iconUrl}">`);
            res.write(`go to <a href="/">home</a>`);
            res.end();


        });
    })
})




app.listen(3000, () => console.log('Server started on port 3000'));


