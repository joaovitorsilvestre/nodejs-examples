var SessionId = require('../models/sessionId')
var User = require('../models/user')

module.exports = function(req, res, next){
    var session_id = req.cookies.session_id;

    SessionId.checkIdentifier(session_id, function(err, user){
        if (err) {
            res.status(500).send('Internal server error')
        }
        if (user) {
            req.user = user
            next()
        } else {
            res.status(401).send('Session expired')
        }
    })
}
