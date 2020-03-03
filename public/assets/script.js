
var socket = io()
const gameDiv = document.getElementById('game')
let localUser = ''
//---------------------------window size-----------------------
let width, height
function background(color) {
    // if (pass === null) {color = pass} 
    if ( height > width && color == "blue" ) { 
        document.body.style.backgroundImage = "url(/assets/blue-vert.gif)"
        // document.getElementsByTagName('button').style.borderColor = "#00BAFF" // im having trouble setting the button border colors dynamically 
    } else if (width > height && color == "blue") {
        document.body.style.backgroundImage = "url(/assets/blue-hori.gif)"
        // document.getElementsByTagName('button').style.borderColor = "#00BAFF"
    } else if (height > width && color == "red") {
        document.body.style.backgroundImage = "url(/assets/red-vert.gif)"
        // document.getElementsByTagName('button').style.borderColor = "#ff4500"
    } else if (width > height && color == "red") {
        document.body.style.backgroundImage = "url(/assets/red-hori.gif)"
        // document.getElementsByTagName('button').style.borderColor = "#ff4500"
    } else {
        document.body.style.backgroundImage = "url(/assets/blue-static.jpg)"
        // document.getElementsByTagName('button').style.borderColor = "#00BAFF"
    }
// console.log(`width = ${width} and height = ${height}`)
}

window.addEventListener ("load", function() {
    width = window.innerWidth
    height = window.innerHeight
})

window.addEventListener ("resize", function() {
    width = window.innerWidth
    height = window.innerHeight
})
//----------------------end window size----------------------

function sendPress(id) {
    socket.emit('button-press', JSON.stringify({
        "id": id,
        "localUser": localUser, 
        "socketId": socket.id
    }))
}

function secondPress(id) {
    socket.emit('second-press', JSON.stringify({
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

    const br0 = document.createElement('br') // line break
    gameDiv.appendChild(br0)

    const nameBox = document.createElement('input') // input box for player name 
    nameBox.setAttribute('id', "playerName")
    gameDiv.appendChild(nameBox)

    const br1 = document.createElement('br') // line break 
    gameDiv.appendChild(br1)

    const button = document.createElement('button') // button 
    button.setAttribute('onClick', "setUser()")
    button.appendChild(document.createTextNode("START GAME!"))
    gameDiv.appendChild(button)

    background("blue")    
})

socket.on('load-buttons', function(buttonData){
    gameDiv.innerHTML=''
    for (i = 0; i < buttonData.length; i++) {
        const br = document.createElement('br')
        gameDiv.appendChild(br)
        const newBtn = document.createElement("button")
        newBtn.setAttribute('id', i)
        newBtn.setAttribute('onClick', 'sendPress(this.id)')
        newBtn.appendChild(document.createTextNode(buttonData[i].sentence)) 
        gameDiv.appendChild(newBtn)
    }
})

socket.on('load-buttons2', function(buttonData){
    gameDiv.innerHTML=''
    for (i = 0; i < buttonData.length; i++) {
        const br = document.createElement('br')
        gameDiv.appendChild(br)
        const newBtn = document.createElement("button")
        newBtn.setAttribute('id', i)
        newBtn.setAttribute('onClick', 'secondPress(this.id)')
        newBtn.appendChild(document.createTextNode(buttonData[i].sentence)) 
        gameDiv.appendChild(newBtn)
    }
    background("red")

})

socket.on('load-list', function(buttonData){
    gameDiv.innerHTML=''
    for (i = 0; i < buttonData.length; i++) {
        const br = document.createElement('br')
        gameDiv.appendChild(br)
        const para = document.createElement("p")
        para.appendChild(document.createTextNode(buttonData[i].sentence)) 
        gameDiv.appendChild(para)
    }
    background("red")

})