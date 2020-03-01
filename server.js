const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

const fakeObjScav = [
  { sentence: 'The stupid red hat example we (I) keep using' },
  { sentence: 'A confused man' },
  { sentence: 'A man hitting on an un-interested woman' },
  { sentence: 'Someone spilled a drink' },
  { sentence: 'Confused guy' },
  { sentence: "Someone on a date, but they're texting" }
];

const fakeObjDare = [
  { sentence: 'Try and sell your shoes to the bartender' },
  { sentence: 'Ask an angry man about your thumbs' },
  { sentence: 'Offer your shoes to the bartender' },
  { sentence: 'Get someone to buy you a drink' },
  { sentence: 'Ask a woman about your eyebrows' },
  { sentence: 'Try and sell your eyebrows to an angry man' }
];

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
      "userName": data,
      "userId": socket.id
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

// THIS IS WHERE THE CONNECTION IS LISTENING TO THE DATABASE
const connection = require('./config/connection.js');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
http.listen(PORT, function() {
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

// FILTER ARRAY OF OBJECTS, WHICH PROPERTY MATCHES VALUE AND RETURNS ARRAY
const nouns = ['man', 'woman', 'child', 'angry man'];
const objects = ['shoes', 'thumbs', 'drink', 'eyebrows'];

for (i = 0; i < Array.length; i++) {
  console.log(objects);
}
