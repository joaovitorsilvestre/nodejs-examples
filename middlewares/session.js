var redisClient = require('../commons/redisClient');

var User = require('../models/user');

var errTypes = [
    {errName: 'Not Allowed', errMessage: 'You must be logged in'},
    {errName: 'Not Allowed', errMessage: 'Sommethin wrong with your credentials'},
    {errName: 'Internal server error', errMessage: 'Try again latter'},
]

module.exports = function(req, res, next){
    var session_id = req.cookies.session_id

    var findUserObject = new Promise(function(resolve, reject) {
        if (!session_id) reject(errTypes[0]);

        redisClient.get(session_id, function(err, username) {
            if (err) reject(errTypes[1]);

            User.findOneByUsername(username, function(err, user) {
                if (err) reject(errTypes[2]);

                if (user) {
                    resolve(user)
                } else {
                    reject(errTypes[1]);
                };
            });
        });
    });

    findUserObject.then(function(user) {
        req.user = user;
        next();
    }).catch(function(err) {
        res.status(401).render('error', {
            errName: err.errName,
            errMessage: err.errMessage
        });
    })
}
