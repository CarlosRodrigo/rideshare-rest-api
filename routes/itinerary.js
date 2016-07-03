// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Itinerary = require('../models/itinerary');

// Routes
Itinerary.methods(['get', 'post', 'put', 'delete']);
Itinerary.register(router, '/itineraries');

module.exports = router;