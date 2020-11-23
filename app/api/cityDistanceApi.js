var insertDistance=require('../model/addDistance');
var request = require('request');
var config = require('../config')

module.exports ={
    //Brings from GoogleApi the distance
    apiDistance:function(engOriginCity, originCity, engDestinationCity, destinationCity, callback) {
        var kilometer;
        var distance;
        var jsonDistance;
        console.log(engOriginCity, engDestinationCity);
        var all_routing = config.start_routing + engOriginCity + config.mid_routing + engDestinationCity + config.end_routing + config.API_KEY;
        request.get('https://maps.googleapis.com/maps/api/distancematrix/' + all_routing
            , function (error, response) {
                if (error) {
                    console.log("error");
                } else {
                    distance = response.body;
                    jsonDistance = JSON.parse(distance);
                    if (jsonDistance == null) {
                        callback("שם העיר אינו תקין");
                    }
                    else {
                        kilometer = jsonDistance.rows[0].elements[0].distance.text;
                        var kilometerDistance = kilometer.replace(' mi', '');
                        this.getDistance = kilometerDistance;
                        console.log(originCity, destinationCity, kilometerDistance);
                        //go to model/addDistance
                        insertDistance.addDistance(originCity, destinationCity, kilometerDistance, distanceCity => {
                            callback(kilometerDistance);
                        });
                    }
    
                }
            })
    }
}