const express = require('express');
const app = express();

app.use(express.static(__dirname + "/public"));
const server = app.listen(8000);

const io = require('socket.io')(server);

let background_color = "white";

io.on('connect', function(socket) {
    socket.emit('connection', {msg: "connection successful", background_color: background_color});
    socket.on('color', function(data) {
        background_color = data;
        io.emit('update', background_color);
    })
});