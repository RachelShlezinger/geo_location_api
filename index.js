var http = require("http"); 
var distanceCity = require('./app/controllers/distanceCity');
var puplare=require('./app/controllers/popular');

var MyServerDistance = http.createServer(distanceCity);
var MyServerPoplure = http.createServer(puplare);

MyServerDistance.listen(5000); // go to controllers/distanceCity
MyServerPoplure.listen(8200); // go to controllers/popular
