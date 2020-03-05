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
let user = []

let objScav
orm.scav().then(values => { 
  objScav = values.map(({ scavenger_sentence }) => scavenger_sentence)
})

let objDare 
Promise.all([orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()])
  .then(values => objDare = values)

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', function(socket) {
    console.log('A user connected: ' + socket.id);
    socket.emit('logo-screen', user.map(user => user.userName));
    socket.on('username', function(data) {
    user.push({
      "userName": data, // need to make sure none uses the same name upon login. the same search of var user can identify a user as being the same player if they get booted and have to log in again 
      "userId": socket.id // upon login .find() to search for existing username. prompt player "is this you" yes/no if yes, overwrite socket.id, if no alert "username in use please pick different name"
    })
  });

  socket.on('game-start', function() {
    // data = 'Scavenger Hunt! Spot any of these things in the crowd, and be the first to press the button'
    // io.to(`${socket.id}`).emit('instructions', data)
    io.emit('load-buttons', [objScav, 'button', 'sendPress', 'blue'])
    Promise.all([orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()])
      .then(values => objDare = values)
  })

  socket.on('button-press', function(data) {
    const parsed = JSON.parse(data)
    firstPlace = user.find(user => user.userName === parsed.localUser)
    console.log('first place = ', firstPlace.userId)
    socket.broadcast.emit('load-buttons',  [objScav, 'button', 'secondPress', 'red'])
  });

  socket.on('second-press', function(data) {
    orm.scav().then(values => {
      objScav = values.map(({ scavenger_sentence }) => scavenger_sentence)
    })
    const parsed = JSON.parse(data)
    secondPlace = user.find(user => user.userName === parsed.localUser)
    console.log('second place = ', secondPlace.userId)
    io.to(`${firstPlace.userId}`).emit('load-buttons', [objDare, 'button', 'thirdPress', 'red']);
    io.to(`${secondPlace.userId}`).emit('load-buttons', [objDare, 'p', 'thirdPress', 'blue']) 
    let losers = user.filter(user => user.userId !== firstPlace.userId)
    let loosers = losers.filter(losers => losers.userId !== secondPlace.userId) 
    console.log(loosers)
    for (i=0; i<loosers.length; i++) {
      io.to(`${loosers[i].userId}`).emit('load-buttons', [objDare, 'p', 'thirdPress', 'red']);
    }
  });
})
app.post('/:table/:value', function(req, res) {
  orm.add(req.params.table, req.params.value)
  res.status(200)
})

http.listen(PORT, function () {
  console.log(`Server running, listening on ${PORT}`)
})
