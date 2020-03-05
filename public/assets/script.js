var socket = io()
const gameDiv = document.getElementById('game')
let localUser = ''
let logged = false

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

window.addEventListener ("load", function() { // old school event listeners, same as what were doing with socket, except different, but not really 
    width = window.innerWidth
    height = window.innerHeight
})

window.addEventListener ("resize", function() {
    width = window.innerWidth
    height = window.innerHeight
})
//----------------------end window size----------------------

function sendPress(id) { // we're calling these functions using onClick() in html. When we create the buttons later in the page, we're going to dynamically assign them a function 
    socket.emit('button-press', JSON.stringify({
        "id": id,
        "localUser": localUser, 
        "socketId": socket.id
    }))
}

function secondPress(id) { // in the server the first click and the second click are different (first palce and second palce). they run different functiuons when clicked. 
    socket.emit('second-press', JSON.stringify({
        "id": id,
        "localUser": localUser
    }))
}

function setUser() { // this is the function the button calls on the main menu
    localUser = document.getElementById('playerName').value
    logged = true
    socket.emit('username', localUser) // emit event to set username, sends the event along with username data to the server 
    socket.emit('game-start') // new event that tells the server at least one person is in the game, the serverin return fires the load-buttons event with (scavenger) data 
}

socket.on('logo-screen', function(){ // socket.on listens for an event, and fires when it gets it. we can emit and listen on both the server and client. 
 
    gameDiv.innerHTML=''

        const picture = document.createElement('img') //create logo picture 
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
        button.style.borderColor = "#00BAFF" // this is that line that was fucking me up 
        gameDiv.appendChild(button)

        background("blue")   
    
})

socket.on('load-buttons', function(buttonData){ // a listener and a function for when we want to load buttons. we can load whatever we want on the buttons depending on what date we send. we use this funtion for both scavenger data and dare data 
    console.log(buttonData)
  if(logged) {
    gameDiv.innerHTML=''
    for (i = 0; i < buttonData.length; i++) {
        const br = document.createElement('br') // dynamically creating dom elements just like we did before 
        gameDiv.appendChild(br)
        const newBtn = document.createElement("button")
        newBtn.setAttribute('id', i)
        newBtn.setAttribute('onClick', 'sendPress(this.id)')
        newBtn.style.borderColor = "#00BAFF"
        newBtn.appendChild(document.createTextNode(buttonData[i])) 
        gameDiv.appendChild(newBtn)
    }
}
})

socket.on('load-buttons2', function(buttonData){ // the only difference here is the function the buttons call when you click them 
    if(logged) {
    gameDiv.innerHTML=''
    for (i = 0; i < buttonData.length; i++) {
        const br = document.createElement('br')
        gameDiv.appendChild(br)
        const newBtn = document.createElement("button")
        newBtn.setAttribute('id', i)
        newBtn.setAttribute('onClick', 'secondPress(this.id)')
        newBtn.style.borderColor = "#ff4500"
        newBtn.appendChild(document.createTextNode(buttonData[i])) 
        gameDiv.appendChild(newBtn)
    }
    background("red")
    }
})

socket.on('load-list', function(buttonData){ // pretty much the same as load-buttons 1 and 2, except we're loading the data into p tags instead of buttons, so that they're not clickable 
    if(logged) {
    gameDiv.innerHTML=''
    for (i = 0; i < buttonData.length; i++) {
        const br = document.createElement('br')
        gameDiv.appendChild(br)
        const para = document.createElement("p")
        para.appendChild(document.createTextNode(buttonData[i])) 
        gameDiv.appendChild(para)
    }
    background("red")
    }
})

