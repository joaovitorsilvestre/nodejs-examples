var http = require('http');
var path = require('path');
var express = require('express');
var socketIO = require('socket.io');

/**
  * Import controllers and middlewares
  */
var chat = require('./controllers/chat.js');

/**
  * Server setup
  */
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

/**
  * General setup
  */
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

/**
  * Socket io
  */
var chatSpace = io.of('/chat');
chatSpace.on('connection', chat.socketio);

/**
  * Use controllers
  */
app.use('/', chat.router);

/**
  * Handdle if the none page is founded
  */
app.use(function(req, res, next){
    res.render('error', {
        errName: 'Page not found',
        errMessage: 'Check the URL that you did this request'
    });
});

// Start the server
server.listen(3000, function() {
    console.log('Server is running in localhost:3000');
});
