var SessionId = require('../../models/sessionId')

module.exports = function(req, res){
    var session_id = req.query.session_id

    SessionId.checkIdentifier(session_id, function(err, user){
        if (err) throw err;

        if (user) {
            res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});

            var responseJson = JSON.stringify({
                user: user
            });

            res.end(responseJson);
        } else {
            res.clearCookie('session_id');
            res.writeHead(401, {'Content-Type': "application/json"});
            var error = Json.stringify({
                'error': 'expired'
            });
            res.end(error)
        }
    })
}
