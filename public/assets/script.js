var socket = io()
const gameDiv = document.getElementById('game')
let localUser
let userName
let logged = false
// let instrOn = true
// const instrBox = document.getElementById('instr')

let width, height
function background(color) {
    if ( height > width && color == "blue" ) { 
        document.body.style.backgroundImage = "url(/assets/blue-vert.gif)"
    } else if (width > height && color == "blue") {
        document.body.style.backgroundImage = "url(/assets/blue-hori.gif)"
    } else if (height > width && color == "red") {
        document.body.style.backgroundImage = "url(/assets/red-vert.gif)"
    } else if (width > height && color == "red") {
        document.body.style.backgroundImage = "url(/assets/red-hori.gif)"
    } else {
        document.body.style.backgroundImage = "url(/assets/blue-static.jpg)"
    }
}

function onLoad(user) {
    localUser = user
    logged = true
    socket.emit('login-again')
    socket.emit('username', localUser)
}

window.addEventListener ("load", function() {
    width = window.innerWidth
    height = window.innerHeight
})

window.addEventListener ("resize", function() {
    width = window.innerWidth
    height = window.innerHeight
})

function inst() {
    save = gameDiv.innerHTML
    gameDiv.innerHTML = `<h3>Enter your name and press Start Game</h3>
                        <h3>Scavenger Hunt! Spot any of these things in the crowd, and be the first to press the button</h3>
                        <h3>The first player to press the button gets to choose an upcoming dare</h3>
                        <h3>The second person to spot the item and press the button is exempt from the coming dare</h3>
                        <h3>Choose a dare, choose a target, and make your buddies embarass themselves!</h3>
                        <h3>Blue screens are present when the game is in waiting mode, keep looking for things in the crowd!</h3>
                        <h3>Red screens mean danger. The screen will flash red when first place has found something, but second place has not registered yet. </h3>
                        <h3>It will also flash red during the dare stage, watch out!</h3>`
    setTimeout(function(){gameDiv.innerHTML = save}, 10000)
}

function listUsers(){
    gameDiv.innerHTML = ''
    for (i=0; i<userName.length; i++) {
        const button = document.createElement('button') // button 
        button.setAttribute('onClick', `onLoad("${userName[i]}")`)
        button.style.borderColor = "#00BAFF"
        button.appendChild(document.createTextNode(userName[i]))
        gameDiv.appendChild(button) 
    }
}

function sendPress(id) {
    socket.emit('button-press', JSON.stringify({
        "id": id,
        "localUser": localUser
    }))
}

function secondPress(id) {
    socket.emit('second-press', JSON.stringify({
        "id": id,
        "localUser": localUser
    }))
}

function thirdPress() {
    socket.emit('game-start')
}

function setUser() { 
    localUser = document.getElementById('playerName').value
    console.log(localUser)
    logged = true
    socket.emit('username', localUser) 
    socket.emit('game-start') 
}

socket.on('logo-screen', function(userName0){
    logged = false
    gameDiv.innerHTML=''
    userName = userName0
    const picture = document.createElement('img') //create logo picture up top 
    picture.setAttribute('src', './assets/logo.png')
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
    button.style.borderColor = "#00BAFF"
    button.appendChild(document.createTextNode("START GAME!"))
    gameDiv.appendChild(button)   

    const button0 = document.createElement('button') // button 
    button0.setAttribute('onClick', "listUsers()")
    button0.style.borderColor = "#00BAFF"
    button0.appendChild(document.createTextNode("Already Logged In?"))
    gameDiv.appendChild(button0)

    const button1 = document.createElement('button') // button 
    button1.setAttribute('onClick', "inst()")
    button1.style.borderColor = "#00BAFF"
    button1.appendChild(document.createTextNode("Instructions"))
    gameDiv.appendChild(button1)

    background("blue")
})

socket.on('waiting', function() {
    // waits for the next emit before entering game, creates a bug if the player was sitting on the dare/button screen, as no player will be able to move the game forward
    // eliminated a bug where loggin on in the middle of a game reset all players to blue scavenger
    gameDiv.innerHTML = '<h3>Player Entering Game</h3><h3>Please Wait</h3>'
})

// socket.on('instructions', function(data) {
//     if (instrOn) {
//         if (logged) {
//             gameDiv.innerHTML=''
//             const para = document.createElement('p')
//             para.appendChild(document.createTextNode(data))
//             gameDiv.appendChild(para)
//         }
//     }
// })

socket.on('load-buttons', function([buttonData, bl, fn, color]) { //data, button or p, what function is called, color of background
    if(logged) {
        gameDiv.innerHTML=''
        for (i = 0; i < buttonData.length; i++) {
            const br = document.createElement('br')
            gameDiv.appendChild(br)
            const ele = document.createElement(bl)
            if (bl === "button") { 
                ele.setAttribute('id', i)
                ele.setAttribute('onClick', `${fn}(this.id)`)
                if (color == "blue") { ele.style.borderColor = "#00BAFF"}
                if (color == "red") { ele.style.borderColor = "#ff4500"}
            }
            ele.appendChild(document.createTextNode(buttonData[i])) 
            gameDiv.appendChild(ele)
        }
    }
    background(color)
}) 

// socket.on('grab-data', function(id) {
//     tempData = gameDiv.innerHTML
//     socket.to(`${id}`).emit('send-data', tempData)
// })

// socket.on('send-data', function(tempData) {
//     gameDiv.innerHTML = tempData
// })