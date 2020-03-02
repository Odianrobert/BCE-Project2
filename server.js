const path = require('path');
const express = require('express');
const mysql = require('mysql')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const orm = require('./orm/orm.js')
const PORT = process.env.PORT || 3001;


const objScav = [orm.scav()]

const objDare = [orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()]

const user = []

app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/index.html'))
// })

io.on('connection', function(socket) {
  console.log('A user connected: ' + socket.id);

  //get the front end to fire a function that creates the buttons
  socket.emit('logo-screen');
  socket.on('username', function(data) {
    // console.log('Username: ' + data);
    user.push({
      "userName": data, // need to make sure none uses the same name upon login. the same search of var user can identify a user as being the same player if they get booted and have to log in again 
      "userId": socket.id // upon login .find() to search for existing username. prompt player "is this you" yes/no if yes, overwrite socket.id, if no alert "username in use please pick different name"
    })
    console.log(user)
  });

  socket.on('game-start', function() {
    socket.emit('load-buttons', fakeObjScav);
  });

  socket.on('button-press', function(data) {
    console.log('data received: ' + data);
    socket.emit('load-buttons', fakeObjDare);

    io.on('connection', function(socket) {
      console.log('A user connected');
      socket.on('button-press', function(data) {
        console.log('data received: ' + data);
      });
    });
  });
});

// get api endpoint(s)

// // post endpoint (add new nouns / objects to tables?)

http.listen(PORT, function () {
  console.log(`Server running, listening on ${PORT}`)
})

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "toorTOOR11$$",
//   database: "sentences_db"
// })

// connection.connect(function(err) {
//   if (err) { 
//       console.log(err)
//       return
//   } else {
//       console.log('Connected to DB')
//   }
// })

// THIS IS WHERE THE CONNECTION IS LISTENING TO THE DATABASE
// const connection = require('./config/connection.js');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// http.listen(PORT, function() {
//   console.log('App listening on PORT ' + PORT);
//   connection.query(
//     //     'INSERT INTO new_table (noun, objects) VALUES (?, ?)',
//     //     ['woman', 'belt'],
//     'SELECT * FROM fun_game.sentences',
//     function(err, res) {
//       if (err) throw err;
//       console.log(res[0].noun.split(';'));
//     }
//   );
// });

// // FILTER ARRAY OF OBJECTS, WHICH PROPERTY MATCHES VALUE AND RETURNS ARRAY
// const nouns = ['man', 'woman', 'child', 'angry man'];
// const objects = ['shoes', 'thumbs', 'drink', 'eyebrows'];

// for (i = 0; i < Array.length; i++) {
//   console.log(objects);
// }

// let testArray = [orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()]

Promise.all(objDare).then(values => {console.log(values)})
Promise.all(objScav).then(values => {console.log(values)})

// function log() {
//     console.log(testArray)
//     console.log(objScav)
// }
// setTimeout(log, 1000)

// console.log(orm.returnOne)