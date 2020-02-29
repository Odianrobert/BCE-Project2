// const path = require('path')
// const express = require('express')
// const app = express()
// const http = require('http').createServer(app) 
// const io = require('socket.io')(http)
// const PORT = process.env.PORT || 3000

// const fakeObjScav = [
//   {"sentence": "The stupud red hat example we (I) keep using"},
//   {"sentence": "A confused man"},
//   {"sentence": "A man hitting on an un-interested woman"},
//   {"sentence": "Someone spilled a drink"},
//   {"sentence": "Confused guy"},
//   {"sentence": "Someone on a date, but they're texing"}
// ]

// const fakeObjDare = [
//   {"sentence": "Try and sell your shoes to the bartender"},
//   {"sentence": "Ask an angry man about your thumbs"},
//   {"sentence": "Offer your shoes to the bartender"},
//   {"sentence": "Get someone to buy you a drink"},
//   {"sentence": "Ask a woman about your eyebrows"},
//   {"sentence": "Try and sell your eyebrows to an angry man"}
// ]

// app.use(express.static('public'))

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, './public/index.html'))
// })
// io.on('connection', function(socket){
//   socket.broadcast.emit(localUser + 'has joined the game');
// });

// io.on('connection', function(socket){
//   console.log('A user connected: ' + socket.id)
//   //get the front end to fire a function that creates the buttons
//   socket.emit('load-buttons', fakeObjScav)

//   socket.on('button-press', function(data){
//     console.log('data recieved: ' + data)
//     socket.emit('load-buttons', fakeObjDare)
//   })
//   socket.on("username", function(data){
//     console.log('Username: ' + data)
//   })
// })

// // get api endpoint(s)

// // post endpoint (add new nouns / objects to tables?)

// http.listen(PORT, function () {
//   console.log(`Server running, listening on ${PORT}`)
// })

const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app) 
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

const fakeObjScav = [
  {"sentence": "The stupud red hat example we (I) keep using"},
  {"sentence": "A confused man"},
  {"sentence": "A man hitting on an un-interested woman"},
  {"sentence": "Someone spilled a drink"},
  {"sentence": "Confused guy"},
  {"sentence": "Someone on a date, but they're texing"}
]

const fakeObjDare = [
  {"sentence": "Try and sell your shoes to the bartender"},
  {"sentence": "Ask an angry man about your thumbs"},
  {"sentence": "Offer your shoes to the bartender"},
  {"sentence": "Get someone to buy you a drink"},
  {"sentence": "Ask a woman about your eyebrows"},
  {"sentence": "Try and sell your eyebrows to an angry man"}
]

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'))
})



io.on('connection', function(socket){
  console.log('A user connected: ' + socket.id)
  //get the front end to fire a function that creates the buttons
  socket.emit('logo-screen');
  socket.on("username", function(data){
    console.log('Username: ' + data)
  })

  socket.on('game-start', function() {
    socket.emit('load-buttons', fakeObjScav)
  })

  socket.on('button-press', function(data){
    console.log('First Place: ' + data)
    //add logging - first place -> value somewhere
    socket.broadcast.emit('load-buttons2', fakeObjScav)
  })
  
  socket.on('second-press', function(data) {
    console.log('Second Place: ' + data)
    // add logging - second place -> value 
    // socket.emit('load-buttons', fakeObjDare)
    socket.broadcast.emit('load-list', fakeObjDare)
  })
  // if/else to send the right events to the right people 

})



// get api endpoint(s)

// post endpoint (add new nouns / objects to tables?)


http.listen(PORT, function () {
  console.log(`Server running, listening on ${PORT}`)
})

// const connection = require('./config/connection.js');
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.listen(PORT, function() {
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
