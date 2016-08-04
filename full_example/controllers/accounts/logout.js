var redisClient = require('../../commons/redisClient');

module.exports = function(req, res){
    var session_id = req.cookies.session_id;

    if (session_id) {
        redisClient.DEL(session_id);
    }

    res.clearCookie('session_id');
    res.redirect('/accounts/login');
};
