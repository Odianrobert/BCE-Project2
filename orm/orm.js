const connection = require('../config/connection.js')

function add(param1, param2) {
    let sql 
    if (param1 === 'nouns') {
        sql = `INSERT INTO nouns(sentence_noun) VALUES('${param2}')`
    } else if (param1 === 'objects') {
        sql = `INSERT INTO objects(sentence_object) VALUES('${param2}')`
    } else if (param1 === 'sentences') {
        sql= `INSERT INTO scavenger(scavenger_sentence) VALUES('${param2}')`
    } else {
        console.log('Table not found')
    }
    connection.query(sql, function (err, results) {
        if (err) {console.log(err)
        } else {
            console.log(`Added "${param2}" to ${param1} table. Affected rows: ${results.affectedRows}`)
        }
    })
}

function scav() { 
    return new Promise (function (resolve, reject) {
        const sql = `SELECT scavenger_sentence FROM scavenger
                    ORDER BY RAND()
                    LIMIT 6`
        connection.query(sql, function(err,results) {
            if (err) { console.log(err) 
            } else { 
                resolve (results)
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
                data.sentence = results[0].sentence
                if ( results[0].requires_noun !== 0 ) {
                    const sql_noun = `SELECT * FROM nouns
                                    ORDER BY RAND()
                                    LIMIT ${results[0].requires_noun}`
                    connection.query(sql_noun, function(err, nouns) {
                        if (err) {console.log(err)
                        } else {
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

module.exports.add = add
module.exports.returnOne = returnOne
module.exports.scav = scav
module.exports.connection = connection 