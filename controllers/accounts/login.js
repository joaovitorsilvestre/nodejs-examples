var SessionId = require('../../models/sessionId')
var User = require('../../models/user')

module.exports = {
    get: function(req, res){
        res.render('accounts/login', {title:'Login'})
    },
    post: function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        User.authenticate(username, password, function(err, user){
            if (err) {
                res.status(500).send('Internal server error');
            };

            if (user) {
                SessionId.create(user.username, function(err, session) {
                    if (err) {
                        res.status(500).send('Internal server error');
                    };

                    res.cookie( 'session_id', session.identifier,
                        { expires: session.expires }
                    );
                    res.status(200).end()
                });
            } else {
                res.status(401).send('Wrong credentials')
            }
        });
    }
}
