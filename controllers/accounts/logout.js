var SessionId = require('../../models/sessionId')
var User = require('../../models/user')

module.exports = function(req, res){
    res.clearCookie('session_id');
    res.redirect('/accounts/login')
}
