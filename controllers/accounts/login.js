var SessionId = require('../../models/sessionId')
var User = require('../../models/user')

module.exports = {
    get: function(req, res){
        res.render('accounts/login', {title:'Login'})
    },
    post: function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        if (username && password){
            User.authenticate(username, password, function(err, user){
                if (err) {
                    res.status(500).send('Internal server error' + err.errmsg);
                };

                if (user) {
                    SessionId.create(user.username, function(session) {
                        res.cookie( 'session_id', session.identifier,
                            { expires: session.expires }
                        );
                        res.status(200).end()
                    });
                } else {
                    res.status(401).send('Wrong credentials')
                }
            })
        } else {
            res.status(401).send('Username or password was not been send')
        }
    }
}
