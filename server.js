const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// get api endpoint(s)

// post endpoint (add new nouns / objects to tables?)

app.listen(PORT, function () {
  console.log(`Server running, listening on ${PORT}`)
})
