var express = require('express');
var router = express.Router();

//routes
var login = require('./accounts/login')
var register = require('./accounts/register')
var logout = require('./accounts/logout')

router.route('/login')
    .get( login.get )
    .post( login.post)

router.route('/register')
    .get( register.get )
    .post( register.post )

router.get('/logout', logout);

module.exports = router
