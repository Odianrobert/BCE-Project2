console.log('hello world')

function sendPress(id) {
    socket.emit('button-press', id)
}