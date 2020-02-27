const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '', // need to use enviornment variables to store password 
  database: ''
})

connection.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to DB')
  }
})
