const express= require("express");
const bodyParser = require("body-parser");
const ejs = require('ejs');
const https = require('https')
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
require('dotenv').config();
const apiKey = process.env.APP_ID;

var url ="https://api.openweathermap.org/data/2.5/weather?q=Lucknow&appid="+ apiKey +"&units=metric";
 var t = new Date();
 const time = t.getHours()+":"+t.getMinutes();



app.get('/',function(req,res){
  https.get(url,function(response){
    response.on("data",function(data){
      const WeatherData = JSON.parse(data);
      // console.log(WeatherData);
      var icon = WeatherData.weather[0].icon;
      var desc = WeatherData.weather[0].description;
      var temp = WeatherData.main.feels_like;
      var imageURL = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
      var humidity = WeatherData.main.humidity;
      var speed = WeatherData.wind.speed ;
      var pressure = (WeatherData.main.pressure /760).toFixed(2);
res.render('index',{speed:speed, humidity:humidity, pressure:pressure,image:imageURL, temp:temp , desc:desc,time:time});
    });
  });





});

app.post('/',function(req,res){
  const query = req.body.cityName;
  const apiKey = "b34f75aef8cee81dea39399341629460"
  const unit = "metric"
  url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+unit;
  res.redirect('/');
});



app.listen(3000,function(req,rev){
  console.log("It ran");
})
