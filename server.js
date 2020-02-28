const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app) 
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

io.on('connection', function(socket){
  console.log('A user connected')
  socket.on('button-press', function(data){
    console.log('data recieved: ' + data)
  })
})



// get api endpoint(s)

// post endpoint (add new nouns / objects to tables?)

http.listen(PORT, function () {
  console.log(`Server running, listening on ${PORT}`)
})


