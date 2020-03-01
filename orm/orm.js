// const mysql = require('mysql')

// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '', // need to use enviornment variables to store password 
//   database: ''
// })

// connection.connect(function (err) {
//   if (err) {
//     console.log(err)
//   } else {
//     console.log('Connected to DB')
//   }
// })

const fakeObjScav = [
  {"sentence": "The stupid red hat example we (I) keep using"},
  {"sentence": "A confused man"},
  {"sentence": "A man hitting on an un-interested woman"},
  {"sentence": "Someone spilled a drink"},
  {"sentence": "Confused guy"},
  {"sentence": "Someone on a date, but they're texting"}
]

const fakeObjDare = [
  {"sentence": "Try and sell your shoes to the bartender"},
  {"sentence": "Ask an angry man about your thumbs"},
  {"sentence": "Offer your shoes to the bartender"},
  {"sentence": "Get someone to buy you a drink"},
  {"sentence": "Ask a woman about your eyebrows"},
  {"sentence": "Try and sell your eyebrows to an angry man"}
]

module.exports = fakeObjScav
// module.exports = fakeObjDare