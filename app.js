var express = require("express");
var bodyParser = require('body-parser');
var https = require('https');

var app = express();

var headers = {
	'User-Agent': 'mishragautam96',
	Authorization: 'Bearer ' + require('./oauth.json').access_token
};

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

var hashtags = [];
var locations = []; //woeids

//middlewares
function callTwitter(options, callback){
  https.get(options, function(response) {
    jsonHandler(response, callback);
  }).on('error', function(e) {
    console.log('Error : ' + e.message);
  });
}

function jsonHandler(response, callback) {
  var json = '';
  response.setEncoding('utf8');
  if(response.statusCode === 200) {
    response.on('data', function(chunk) {
      json += chunk;
    }).on('end', function() {
      callback(JSON.parse(json));
    });
  } else {
    console.log('Error : ' + response.statusCode);
  }
}

//locations
var trendOptions = [
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424848', //1.India
    headers: headers,
    place: 'India'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=2459115', // 2.NY, USA
    headers: headers,
    place: 'USA'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424781', // 3.China
    headers: headers,
    place: 'China'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424856', // 4.Japan
    headers: headers,
    place: 'Japan'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424829', // 5.Germany
    headers: headers,
    place: 'Germany'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424975', // 6.UK
    headers: headers,
    place: 'UK'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424819', // 7.France
    headers: headers,
    place: 'France'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424768', // 8.Brazil
    headers: headers,
    place: 'Brazil'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424853', // 9.Italy
    headers: headers,
    place: 'Italy'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424775', // 10.Canada
    headers: headers,
    place: 'Canada'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424936', // 11.Russia
    headers: headers,
    place: 'Russia'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424868', // 12.Korea
    headers: headers,
    place: 'Korea'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424748', // 13.Australia
    headers: headers,
    place: 'Australia'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424950', // 14.Spain
    headers: headers,
    place: 'Spain'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424846', // 15.Indonesia
    headers: headers,
    place: 'Indonesia'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424900', // 16.Mexico
    headers: headers,
    place: 'Mexico'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424969', // 17.Turkey
    headers: headers,
    place: 'Turkey'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424938', // 18.Saudi Arabia	
    headers: headers,
    place: 'Saudi Arabia'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424957', // 19.Switzerland
    headers: headers,
    place: 'Switzerland'
  },
  {
    host: 'api.twitter.com',
    path: '/1.1/trends/place.json?id=23424802', // 20.Egypt
    headers: headers,
    place: 'Egypt'
  }
  
  ];
  
  //function for updating map
  
  
  function updateMaps(){
    trendOptions.forEach(function(trend){
      callTwitter(trend, function(trendsArray) {
        console.log(trendsArray[0].trends[0].name);
        hashtags.push(trendsArray[0].trends[0].name);
        locations.push(trendsArray[0].locations[0].woeid);
      });
    });
  }
  
  updateMaps();
  
  //Every 5min maps are updated
  setInterval(updateMaps, 1000*60*5);




//routes

app.get("/", function(req, res){
    res.render("index");
});

app.get("/trendtwit", function(req, res){
    res.render("trendtwit", {hashtags:hashtags, locations:locations});
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Trednd Twit is live"); 
});