const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'toorTOOR11$$',
  database: 'fun_game'
});
connection.connect(function(error) {
  if (error) throw error;
  console.log('connection database');
});

module.exports = connection;