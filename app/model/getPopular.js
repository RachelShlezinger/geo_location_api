const { Pool } = require('pg');
var config = require('../config')

const dbSelect = new Pool({
    user: config.user,
    host: config.host,
    database: config.database,
    password: config.password,
    port: config.port,
})

module.exports = {
  ArrPopular:function(callback) {
    dbSelect.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query('select origin_city,destination_city,num_searches from tbl_geo_location order by num_searches desc LIMIT 5', (err, result) => {
        release()
        if (err) {
          return console.error('Error executing query', err.stack)
        }
        callback(result.rows)
      })
    })
  }
}