var redis = require('redis');
var config = require('../config');

var client = redis.createClient(config.redis.port, config.redis.url);

client.on('error', function(err) {
    console.log('error: '+ err);
});

module.exports.set = function(key, value) {
    client.set(key, value, redis.print);
};

module.exports.get = function(key, callback) {
    client.get(key, function(err, value) {
        if (err) {
            callback(err, null);
        };
        if (value) {
            return callback(null, value);
        };
    });
};

module.exports.DEL = function (key) {
    return client.DEL(key);
};

module.exports.quit = function() {
    return client.quit();
};
