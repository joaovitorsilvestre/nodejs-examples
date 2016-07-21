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
                    var newSession = SessionId.create( user.username );
                    res.cookie( 'session_id', newSession.identifier,
                        { expires: newSession.expires }
                    );
                    res.status(200).send()
                } else {
                    res.status(401).send('Wrong credentials')
                }
            })
        } else {
            res.status(401).send('Username or password was not been send')
        }
    }
}
