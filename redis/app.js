var http = require('http');
var express = require('express');

var redisClient = require('./commons/redisClient')

const app = express();
const server = http.createServer(app);

// here we create a new instance with the default port
// that redis use that is 6379
var client = new redisClient(6379, '127.0.0.1');

// first we will set an key value
client.set('ourTestKey', 'hello world', function() {
    console.log('Key created with success');
});

// so now we will get back the value of the key
client.get('ourTestKey', function(err, value) {
    if (err) return console.log('error:', err);

    if (value) {
        console.log('Value was get with success: ', value)
    };
});

// where the magic happens
server.listen(3000, function() {
    console.log('Server is now running at localhost:3000');
});
