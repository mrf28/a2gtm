var log = require('./dev-logger.js');

module.exports = function(server, origins) {
    log("Running socket.io server");
    var io = require('socket.io').listen(server);

    if (origins) {
        io.set("origins", "*:*");
    }

    io.on('connection', function(socket) {
        log('connected');

        socket.on('joinBoard', function(boardId) {
            log('joined board: ' + boardId);
            socket.join(boardId);
        });

        socket.on('leaveBoard', function(boardId) {
            log('left board: ' + boardId);
            socket.leave(boardId);
        });

        socket.on('addColumn', function(data) {
            log('addColumn: ', data);
            socket.broadcast.to(data.boardId)
                .emit("addColumn", data);
        });

        socket.on('addCard', function(data) {
            log('addCard: ', data);
            socket.broadcast.to(data.boardId)
                .emit("addCard", data);
        });

        socket.on('updateColumn', function(data) {
            log('updateColumn: ', data);
            socket.broadcast.to(data.boardId)
                .emit("updateColumn", data);
        });

        socket.on('updateCard', function(data) {
            log('updateCard: ', data);
            socket.broadcast.to(data.boardId)
                .emit("updateCard", data);
        });

        socket.on('disconnect', function() {
            log('disconnecting');
        });
    });
};