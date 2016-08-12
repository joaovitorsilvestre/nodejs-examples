var express = require('express')
var router = express.Router();

var index = require('./chat/index.js')

router.get('/', index);

module.exports.router = router;

module.exports.socketio = function(socket) {
    console.log("\033[33m\Info: \033[0m\ socket connected");
    socket.on('disconnect', function() {
        console.log("\033[33m\Info: \033[0m\ socket disconnect");
    });

    socket.on('message', function(data) {
        var response = {'user': data.user, 'message': data.message};
        socket.broadcast.emit('message', response); // Send to all BUT not sender
        socket.emit('message', response); // send to the same socket;
    });
};
