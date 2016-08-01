var crypto = require('crypto');
var redisClient = require('../../commons/redisClient');

var User = require('../../models/user');

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
                var identifier = crypto.randomBytes(64).toString('hex');
                var expireDate = new Date(Date.now() + (1000 * 60 * 60 * 24));

                redisClient.set(identifier, username);

                res.cookie( 'session_id', identifier,{
                    expires: expireDate
                });
                res.status(200).redirect('/chat');
            } else {
                res.status(401).send('Wrong credentials');
            };
        });
    }
};
