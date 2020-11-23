const { Pool } = require('pg')
var config = require('../config');

const dbInsert = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
})

module.exports={
    //insert to DB the new distance
     addDistance:function(originCity, destinationCity, distance, callback) {
        var queryInsertDistance = {
            text: 'INSERT INTO tbl_geo_location (destination_city,origin_city,distance) VALUES($1, $2, $3)',
            values: [originCity, destinationCity, distance]
        };
        dbInsert.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack)
            }
            client.query(queryInsertDistance, (err, result) => {
                release()
                if (err) {
                    return console.error('Error executing query', err.stack)
                }
                console.log(result.rows)
                callback(1);
            })
        })
    }
    
}