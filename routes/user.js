// Dependencies
var express = require('express');
var router = express.Router();

// Models
var User = require('../models/user');

// Routes
User.methods(['get', 'post', 'put', 'delete']);
User.register(router, '/users');

module.exports = router;