var User = require('../../models/user');

module.exports = {
    get: function(req, res){
        res.render('accounts/register', {title:'Registrar'})
    },
    post: function(req, res, next){
        username = req.body.username;
        password = req.body.password;

        User.create(username, password, function(err) {
            if (err) {
                res.status(500).send('internal server error' + err.errmsg);
            } else {
                res.status(200).send();
            };
        });
    }
};
