module.exports = function(req, res){
    res.clearCookie('session_id');
    res.redirect('/accounts/login')
}
