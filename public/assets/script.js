// var socket = io()
// const gameDiv = document.getElementById('game')
// let localUser = ''

// function sendPress(id) {
//     socket.emit('button-press', JSON.stringify({
//         "id": id,
//         "localUser": localUser
//     }))
// }

// function setUser() {
//     localUser = prompt('Enter your username')
//     socket.emit('username', localUser)
// }

// setUser()

// socket.on('entered_game', function(localUser) {
//     startScreen.append.html(localUser);
// });
// ask username

// socket.on('load-buttons', function(buttonData){
//     gameDiv.innerHTML=''
//     for (i = 0; i < buttonData.length; i++) {
//         // console.log(i)
//         const br = document.createElement('br')
//         gameDiv.appendChild(br)
//         const newBtn = document.createElement("button")
//         newBtn.className = 'btn btn-primary';
//         newBtn.setAttribute('id', i)
//         newBtn.setAttribute('onClick', 'sendPress(this.id)')
//         newBtn.appendChild(document.createTextNode(buttonData[i].sentence)) 
//         gameDiv.appendChild(newBtn)
//     }
// })

// var commentText = document.createElement('textarea');
// commentText.className = 'form-control';

var socket = io()
const gameDiv = document.getElementById('game')
let localUser = ''

function sendPress(id) {
    socket.emit('button-press', JSON.stringify({
        "id": id,
        "localUser": localUser
    }))
}

function setUser() { // updating function to work with new logo screen 
    localUser = document.getElementById('playerName').value
    socket.emit('username', localUser) // emit event to set username server - side 
    socket.emit('game-start') // new event that tells the server at least one person is in the game, the server should in return fire the load-buttons event with (scavenger) data 
}

socket.on('logo-screen', function(){

    gameDiv.innerHTML=''

    const picture = document.createElement('img') //create logo picture up top 
    picture.setAttribute('src', './assets/70581301-infinite-game-design-template.jpg')
    picture.setAttribute('class', 'logo')
    gameDiv.appendChild(picture)

    const br = document.createElement('br') // line break
    gameDiv.appendChild(br)

    // const nameBox = document.createElement('input') // input box for player name 
    // nameBox.setAttribute('id', playerName)
    // gameDiv.appendChild(namebox)

    // const br = document.createElement('br') // line break 
    // gameDiv.appendChild(br)

    const button = document.createElement('button') // button 
    button.setAttribute('onClick', "setUser()")
    gameDiv.appendChild(button)

})

socket.on('load-buttons', function(buttonData){
    gameDiv.innerHTML=''
    for (i = 0; i < buttonData.length; i++) {
        // console.log(i)
        const br = document.createElement('br')
        gameDiv.appendChild(br)
        const button = document.createElement('button') // button 
        button.setAttribute('onClick', "setUser()")
        button.appendChild(document.createTextNode("START GAME!"))
        gameDiv.appendChild(button)
        const newBtn = document.createElement("button")
        newBtn.setAttribute('id', i)
        nameBox.setAttribute('type', "text")
        newBtn.setAttribute('onClick', 'sendPress(this.id)')
        newBtn.appendChild(document.createTextNode(buttonData[i].sentence)) 
        gameDiv.appendChild(newBtn)
    }
})