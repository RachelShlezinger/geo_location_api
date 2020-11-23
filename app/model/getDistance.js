const { Pool } = require('pg');
var config = require('../config');
var cityTranslate=require('../api/cityTranslate');

const dbSelect = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})

const dbUpdate = new Pool({
  user: config.user,
  host: config.host,
  database: config.database,
  password: config.password,
  port: config.port,
})

module.exports = {
  getCities: function (originCity, destinationCity, callback) {
    var queryDistance = {
      text: 'select geo_location_id,distance,num_searches from tbl_geo_location where destination_city=$1 and origin_city=$2 or destination_city=$2 and origin_city=$1',
      values: [originCity, destinationCity]
    };
    var getDistance = null;
 
    //connect to DB To check if this distance exists in DB
    dbSelect.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query(queryDistance, (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        if (result.rowCount == 0) {//If not available in DB
          //Go to api/translate
          console.log("new");
          cityTranslate.translateCity(originCity, destinationCity, distance => {
            callback(distance)
          });
        }
        else {
          var queryDistanceCountUpdate = {
            text: 'UPDATE tbl_geo_location SET num_searches = num_searches+1 WHERE geo_location_id=$1',
            values: [result.rows[0].geo_location_id]
          };
          console.log(result.rows[0].geo_location_id);
          getDistance = result.rows[0].distance;
          callback(getDistance);
          dbUpdate.connect((err, client, release) => {
            if (err) {
              return console.error('Error acquiring client', err.stack)
            }
            client.query(queryDistanceCountUpdate, (err, result) => {
              release()
              if (err) {
                return console.error('Error executing query', err.stack)
              }
            })
          })

        }
      })
    })

  }
}