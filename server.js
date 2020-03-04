const path = require('path');
const express = require('express');
const mysql = require('mysql')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const orm = require('./orm/orm.js')
const PORT = process.env.PORT || 3000;

let firstPlace
let secondPlace

// const objScav = [orm.scav()]
let objScav
orm.scav().then(values => {
  objScav = values.map(({ scavenger_sentence }) => scavenger_sentence)
})
// const showObj = (a) => {
//   a[0].forEach( b => console.log(b.scavenger_sentence))
// }

// Promise.all(objScav).then(values => {showObj(values)})
let objDare

Promise.all([orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()])
  .then(values => objDare = values)
// const objDare = [orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()]
//  Promise.all(objDare).then(values => {console.log(values)})


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
    socket.emit('load-buttons', objScav)
});

  socket.on('button-press', function(data) {
    const parsed = JSON.parse(data)
     firstPlace = user.find(user => user.userName === parsed.localUser)
    console.log('first place = ', firstPlace.userId)
    //add logging - first place -> value somewhere
   orm.scav().then(values => {
      socket.broadcast.emit('load-buttons2',  values.map(({ scavenger_sentence }) => scavenger_sentence))
    })
  });

    socket.on('second-press', function(data) {
      // console.log('Second Place: ' + data)
      const parsed = JSON.parse(data)
       secondPlace = user.find(user => user.userName === parsed.localUser)
      console.log('second place = ', secondPlace.userId)
      // add logging - second place -> value
      // socket.emit('load-buttons', objDare)
      // socket.broadcast.emit('load-list', objDare)
      // update()

      io.to(`${firstPlace.userId}`).emit('load-buttons', objDare);
      const losers = user.filter(user => user.userId !== firstPlace.userId)

      for (i=0; i<losers.length; i++) {
        io.to(`${losers[i].userId}`).emit('load-list', objDare);
      }
        // console.log(objDare)

  });
})


// post endpoint (add new nouns / objects to tables?)

http.listen(PORT, function () {
  console.log(`Server running, listening on ${PORT}`)
})
