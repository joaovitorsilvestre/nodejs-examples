var http = require('http');
var express = require('express');

/*
  * Importing the controllers
  */
var home = require('./controllers/home');

/*
* Configurate the server
*/
const app = express();
const server = http.createServer(app);

/*
* Use controllers
*/
app.use('/', home);

// Where the magic happens
server.listen(3000, function() {
    console.log('Server is now running at localhost:3000');
})
