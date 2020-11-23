var express = require('express');
var bodyParser = require('body-parser');
var getDistance=require('../model/getDistance')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var cityDistance = express();

cityDistance.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authoriztionre")
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

cityDistance.use(bodyParser.urlencoded({ extended: false }))

cityDistance.use(bodyParser.json())

cityDistance.post('/', urlencodedParser, (req, res) => {//get the two city 
    console.log(req.body.originCity, req.body.destinationCity);
    //go to model/getDistance with 2 cities
    getDistance.getCities(req.body.originCity, req.body.destinationCity, distance => {
        res.json(distance);
        console.log(distance);
    })
})

module.exports = cityDistance;

