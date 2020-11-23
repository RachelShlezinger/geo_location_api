var express = require('express');
var getPopular=require('../model/getPopular')

var app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authoriztionre")
  if (req.method === "OPTIONS") {
      res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.get('/', (req, res) => {
  console.log("popular");
  //go to model/getPopular
  getPopular.ArrPopular(popular=>{
    console.log(popular);
    res.json(popular)
  })
})

module.exports = app;