var SessionId = require('../models/sessionId')
var User = require('../models/user')

module.exports = function(req, res, next){
    var session_id = req.cookies.session_id

    if (session_id) {
        SessionId.checkIdentifier(session_id, function(err, user){
            if (err) {
                res.status(500).end('Internal server error')
            }
            if (user) {
                req.user = user
                next()
            } else {
                res.status(401).end('Session expired')
            }
        });
    } else {
        res.status(401).render('error', {
          errName: 'Not Allowed',
          errMessage: "You must be logged"
        })
    }
}
