var express = require('express');
var router = express.Router();

// import the specific routes
var index = require('./home/index');

router.get('/', index);

module.exports = router;
