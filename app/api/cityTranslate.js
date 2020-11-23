var apiDistance=require('./cityDistanceApi')
var request = require('request'); 

var engOriginCity;
var engDestinationCity;

module.exports={
    //get arr of all cities of israel in hebrew and english
    translateCity:function (originCity, destinationCity, callback) {
        request.get('https://raw.githubusercontent.com/Arturiko/israel-cities/master/JsonProperties.json', function (error, response) {
            if (error) {
            } else {
                var allCities = response.body;
                var jsonParsed = JSON.parse(allCities);
                for (var i in jsonParsed) {
                    if (jsonParsed[i].cityName == originCity) {
                        this.engOriginCity = jsonParsed[i].englishName;
                        console.log(jsonParsed[i].englishName);
                    }
                    else if (jsonParsed[i].cityName == destinationCity) {
                        this.engDestinationCity = jsonParsed[i].englishName;
                        console.log(jsonParsed[i].englishName);
                    }
                }
                console.log(this.engOriginCity,this.engDestinationCity);
                if (this.engOriginCity == null || this.engDestinationCity == null) {
                    callback("שם העיר אינו תקין")
                }
                else {
                    //go to api/cityDistanceApi
                    apiDistance.apiDistance(this.engOriginCity, originCity, this.engDestinationCity, destinationCity, res1 => {
                        console.log("api");
                        callback(res1);
                    });
                }
            }
        });
    }
}