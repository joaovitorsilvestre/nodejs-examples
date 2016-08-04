var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
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
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

/*
 * Use controllers
 */
app.use('/', home);

/*
 * Handdle if the page request doenst exists
 */
app.use('/', function(req, res) {
    res.render('error', {
        errName: 'Page not found',
        errMessages: 'Try do a request to another url'
    });
});

// Where the magic happens
server.listen(3000, function() {
    console.log('Server is now running at localhost:3000');
});
