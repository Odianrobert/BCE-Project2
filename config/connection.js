const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'o677vxfi8ok6exrd.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  port: 3306,
  user: 'gtyz572lj49vypg8',
  password: 'y2mggvcb9enedsuf',
  database: 's6k1qijchpylt46e'

});
connection.connect(function(error) {
  if (error) throw error;
  console.log('connection database');
});

module.exports = connection;