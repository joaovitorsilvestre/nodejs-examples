var http = require('http');
var express = require('express');
var mongoose = require('mongoose');

var User = require('./models/user');

const app = express();
const server = http.createServer(app);

// This will make a connection to mongodb;
// make sure that you have already start mongo with the command "mongod"
const db = mongoose.connect('mongodb://localhost:27017/name_of_database');
//// If you need use diferents databases you can use the follow instead:
// const db1 = mongoose.createConnection('mongodb://localhost:27017/database_1')
// const db2 = mongoose.createConnection('mongodb://localhost:27017/database_2')

// Lets create an user and save to database:
User.create('NameOfUser', 'ThePassword', function(err) {
    if (err) console.log('Connection to mongodb has failed, or user is duplicated');
});

// We can now find the user, we created an method that do the work for us
// So we will wait 2 seconds to search to have time to save user
setTimeout(function() {
    User.findOneByUsername('NameOfUser', function(err, user) {
        if (err) return console.log('Internal error');

        if (user) {
            console.log('User founded, and his password is: ', user.password);
        } else {
            console.log('User not found');
        };
    });
}, 2000)

server.listen(3000, function() {
    console.log('Server is now running at localhost:3000');
})
