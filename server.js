// const path = require('path')
// const express = require('express')
// const app = express()
// const PORT = process.env.PORT || 3000

// app.use(express.static('public'))

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/index.html'))
// })

// // get api endpoint(s)

// // post endpoint (add new nouns / objects to tables?)

// app.listen(PORT, function () {
//   console.log(`Server running, listening on ${PORT}`)
// })
const connection = require('./config/connection.js');
var app = express();
var PORT = process.env.PORT || 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, function() {
  console.log('App listening on PORT ' + PORT);
  connection.query(
    //     'INSERT INTO new_table (noun, objects) VALUES (?, ?)',
    //     ['woman', 'belt'],
    'SELECT * FROM fun_game.sentences',
    function(err, res) {
      if (err) throw err;
      console.log(res[0].noun.split(';'));
    }
  );
});
