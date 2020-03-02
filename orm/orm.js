const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'toorTOOR11$$', // need to use enviornment variables to store password 
  database: 'fun_game'
})

connection.connect(function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to DB')
  }
})

function scav() { 
    return new Promise (function (resolve, reject) {
        const sql = `SELECT scavenger_sentence FROM scavenger
                    ORDER BY RAND()
                    LIMIT 6`
        connection.query(sql, function(err,results) {
            if (err) { console.log(err) 
            } else { 
                resolve(results.map(results => results.scavenger_sentence))
            }
        })
    })
}

function returnOne() {
    return new Promise (function (resolve, reject) {
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
                // resolve(results)
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
                            resolve(final2)
                        }
                    })
                } 
            }

        })
    })
}

// let testArray = [returnOne(), returnOne(), returnOne(), returnOne(), returnOne(), returnOne()]

// function log() {
//     console.log(testArray)
// }
// setTimeout(log, 1000)

module.exports.returnOne = returnOne
module.exports.scav = scav