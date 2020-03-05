const path = require('path');
const express = require('express');
const mysql = require('mysql')

const app = express();
const http = require('http').createServer(app); // this is the block that we're working with with socket.io - express, http, and socket are all required 
const io = require('socket.io')(http);

const orm = require('./orm/orm.js')
const PORT = process.env.PORT || 3000;

let firstPlace
let secondPlace

let objScav
orm.scav().then(values => { 
  objScav = values.map(({ scavenger_sentence }) => scavenger_sentence)
})

let objDare 
Promise.all([orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()])
  .then(values => objDare = values)

const user = []

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

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', function(socket) { // io.on is our global listener, and assignes a socket to each user 
  console.log('A user connected: ' + socket.id); // socket.id holds that value 
  socket.emit('logo-screen'); // .emit is how we create the event "logo-screen" 
  socket.on('username', function(data) { // .on is how we create a listener for the events we create 
    
    console.log(user)
  });

   
  socket.on('game-start', function() { // here we have a listener for "game-start" 
      socket.emit('load-buttons', objScav) // and in response we emit another event "load-buttons" with scavenger data 
  });

  socket.on('button-press', function(data) { // listening for a button press
    const parsed = JSON.parse(data)
     firstPlace = user.find(user => user.userName === parsed.localUser) // do stuff 
    console.log('first place = ', firstPlace.userId)
      socket.broadcast.emit('load-buttons2', objScav)
  });

    socket.on('second-press', function(data) { // we create a second listener for the second press, so that we can do different "do stuff" 
      // console.log('Second Place: ' + data)
      const parsed = JSON.parse(data)
       secondPlace = user.find(user => user.userName === parsed.localUser)
      console.log('second place = ', secondPlace.userId)
      // add logging - second place -> value
      // socket.emit('load-buttons', objDare)
      // socket.broadcast.emit('load-list', objDare)
      // update()
      
      io.to(`${firstPlace.userId}`).emit('load-buttons', objDare) // io.to allows us to emit to a speciufic user, using their socket.id 
      const losers = user.filter(user => user.userId !== firstPlace.userId)

      for (i=0; i<losers.length; i++) {
          io.to(`${losers[i].userId}`).emit('load-list', objDare)
      }
        // console.log(objDare)

  });
})


// post endpoint (add new nouns / objects to tables?)

http.listen(PORT, function () { // standard express listener, except we user http. instead of app. (idk why) 
  console.log(`Server running, listening on ${PORT}`)
})
