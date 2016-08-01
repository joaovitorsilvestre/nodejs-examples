var express = require('express');
var router = express.Router();

//routes
var login = require('./accounts/login');
var register = require('./accounts/register');
var logout = require('./accounts/logout');
var whoAmI = require('./accounts/whoAmI');

router.route('/login')
    .get( login.get )
    .post( login.post)

router.route('/register')
    .get( register.get )
    .post( register.post )

router.get('/logout', logout);

router.get('/who-am-i', whoAmI);

module.exports = router;
