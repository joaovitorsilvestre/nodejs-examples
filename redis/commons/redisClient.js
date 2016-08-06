var redis = require('redis');

module.exports = function(port,url) {
    var client = redis.createClient(port, url);

    // // we handle the error in begginer of the code to assert
    // // that's all ok with the connection, and the client still running
    client.on('error', function(err) {
        console.log('error: ', err);
    });

    // In this piece of code and also in others we
    // will use promises to make all proccess async
    this.set = function(key, value, callback) {
        var setKey = new Promise(function(resolve, reject) {
            resolve(client.set(key, value, redis.print));
        });
        setKey.then(function() {
            callback();
        });
    };

    this.get = function(key, callback) {
        client.get(key, function(err, value) {
            if (err) {
                return callback(err)
            };

            if (value) {
                return callback(null, value)
            };
        });
    };

    this.DEL = function(key, callback) {
        var deleteKey = new Promise(function(resolve, reject) {
            resolve(client.DEL(key));
        });

        deleteKey.then(function() {
            callback()
        })
    };

    this.quit = function(callback) {
        var closeConnection = new Promise(function(resolve, reject) {
            resolve(client.quit());
        })

        closeConnection.then(function() {
            callback();
        });
    };
};
