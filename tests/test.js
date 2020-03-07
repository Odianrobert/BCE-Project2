const orm = require('../orm/orm.js')
const returnOne = orm.returnOne()
const scav = orm.scav()

test('Retrieves a random dare', () => {
    return returnOne.then(data => {
        expect(data).toMatch(new RegExp('[aeiou]+'))
    })
})

test('Retrieves a random scavenger hunt question', () => {
    return scav.then(data => {
        expect(data).toEqual(expect.anything())
    })
})

afterAll(() => {
    orm.connection.end()
})
