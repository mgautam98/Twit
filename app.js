var express = require("express");
var bodyParser = require('body-parser');
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

var hashtags = '#JUSTdoIT';

app.get("/", function(req, res){
    res.render("index");
});

app.get("/trendtwit", function(req, res){
    res.render("trendtwit", {hashtags:hashtags});
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Trednd Twit is live"); 
});