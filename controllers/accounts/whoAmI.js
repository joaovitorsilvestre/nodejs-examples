var redisClient = require('../../commons/redisClient');

module.exports = function(req, res){
    var session_id = req.query.session_id

    redisClient.get(session_id, function(err, user) {
        if (err) {
            res.clearCookie('session_id');
            res.writeHead(401, {'Content-Type': "application/json"});
            var error = JSON.stringify({
                'error': 'expired'
            });
            res.end(error);
        };

        if (user) {
            res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

            var responseJson = JSON.stringify({
                user: user
            });

            res.end(responseJson);
        };
    });
};
