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
let loosers
let user = []
let disconnected = []

let objScav
orm.scav().then(values => { 
  objScav = values.map(({ scavenger_sentence }) => scavenger_sentence)
})

let objDare 
Promise.all([orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()])
  .then(values => objDare = values)

function returnDisconnected() {
  if (disconnected.length == 0) {
    return null
  } else {
    console.log('all disconnected users - ', disconnected)
    return disconnected.map(disconnected => disconnected.userName)
  }
}


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', function(socket) {
  console.log('A user connected: ' + socket.id);

  socket.emit('logo-screen', returnDisconnected());

  socket.on('username', function(data) {
    exist = user.find(user => user.userName === data) 
    index = user.indexOf(exist)
    userDisconnected = returnDisconnected()
    console.log(`Looking for specific disconnected user - ${JSON.stringify(userDisconnected)}`)
    if (exist !== undefined) {
      console.log(`username already exists ${exist.userName}`)
      user[index].userId = socket.id
      // disconnected = disconnected.filter(elem => elem !== exist)
      disconnected = disconnected.splice(index, 1)
      console.log('all disconnected users - ', disconnected)
    } else {
      user.push({
        "userName": data,
        "userId": socket.id 
      })
      console.log(`All users - ${JSON.stringify(user)}`)
    }
  });

  socket.on('login-again', function() {
    socket.to(socket.id).emit('waiting')
  })

  socket.on('game-start', function() {
    // data = 'Scavenger Hunt! Spot any of these things in the crowd, and be the first to press the button'
    // io.to(`${socket.id}`).emit('instructions', data)
    io.emit('load-buttons', [objScav, 'button', 'sendPress', 'blue'])
    Promise.all([orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne(), orm.returnOne()])
      .then(values => objDare = values)
  });

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
    loosers = losers.filter(losers => losers.userId !== secondPlace.userId) 
    
    for (i=0; i<loosers.length; i++) {
      io.to(`${loosers[i].userId}`).emit('load-buttons', [objDare, 'p', 'thirdPress', 'red']);
    }
  });

  socket.on('disconnect', function(reason) {
    if (reason === 'io server disconnect') {
      socket.connect()
    }
    else if (user.find(user => user.userId === socket.id)) {
      disconnected.push(user.find(user => user.userId === socket.id))
      console.log(`All disconnected users ${JSON.stringify(disconnected)}`)
    }
  })

})

app.post('/:table/:value', function(req, res) {
  orm.add(req.params.table, req.params.value)
  res.status(200)
})

http.listen(PORT, function () {
  console.log(`Server running, listening on ${PORT}`)
})
