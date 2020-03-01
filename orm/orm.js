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

function returnOne() {
  let data = {
      sentence: '',
      nouns: [],
      objects: []
  }
  const sql = `SELECT * FROM sentences
                  ORDER BY RAND()
                  LIMIT 1`
  connection.query(sql, function(err, results) {
      if (err) { console.log(err) 
      } else {
          // console.table(results)
          data.sentence = results[0].sentence
          if ( results[0].requires_noun !== 0 ) {
              const sql_noun = `SELECT * FROM nouns
                              ORDER BY RAND()
                              LIMIT ${results[0].requires_noun}`
              connection.query(sql_noun, function(err, nouns) {
                  if (err) {console.log(err)
                  } else {
                      // console.log(nouns)
                      data.nouns[0] = nouns[0].sentence_noun
                  }
              })
          } if ( results[0].requires_object !== 0 ) {
              const sql_object = `SELECT * FROM objects
                                  ORDER BY RAND()
                                  LIMIT ${results[0].requires_object}`
              connection.query(sql_object, function(err, obj) {
                  if (err) {console.log(err) 
                  } else {
                      // console.log(obj)
                      data.objects[0] = obj[0].sentence_object

                      const final1 = data.sentence.replace("$n", data.nouns[0])
                      const final2 = final1.replace("$o", data.objects[0])
                      console.log(final2)
                  }
              })
          } 
          // connection.end()
      }
  })
}

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

module.exports = returnOne()
