var express = require('express');
var router = express.Router();
var session = require('../middlewares/session');

var index = require('./chat/index')

router.get('/', session, index)

module.exports = router;
