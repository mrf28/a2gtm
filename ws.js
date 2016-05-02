var app = require('express')();
// var server = require('http').createServer(app);

// var io = require('socket.io')(server);
// io.set("origins", "*:*");

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
server.listen(4000, function() {
    console.log('Websockets listening on port 4000');
});

io.set("origins", "*:*");

io.on('connection', function(socket) {
    console.log('connected');

    socket.on('joinBoard', function(boardId) {
        console.log('joined board: ' + boardId);
        socket.join(boardId);
    });

    socket.on('addColumn', function(data) {
        console.log('addColumn: ', data);
        socket.broadcast.to(data.boardId)
            .emit("addColumn", data);
    });

    socket.on('addCard', function(data) {
        console.log('addCard: ', data);
        socket.broadcast.to(data.boardId)
            .emit("addCard", data);
    });

    socket.on('updateColumn', function(data) {
        console.log('updateColumn: ', data);
        socket.broadcast.to(data.boardId)
            .emit("updateColumn", data);
    });

    socket.on('updateCard', function(data) {
        console.log('updateCard: ', data);
        socket.broadcast.to(data.boardId)
            .emit("updateCard", data);
    });
    
    socket.on('disconnect', function() {
        console.log('disconnecting');
    });
});

// server.listen(4000, function () {
//   console.log('Websockets listening on port 4000');
// });