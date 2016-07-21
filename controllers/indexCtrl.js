var express = require('express');
var router = express.Router();

var session = require('../middlewares/session')

var index = require('./index/index')
var about = require('./index/about')

router.get('/', session, index)

router.get('/about', about)

module.exports = router;
