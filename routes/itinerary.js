// Dependencies
var express = require('express');
var router = express.Router();

// Models
var Itinerary = require('../models/itinerary');

// Controllers
var ItineraryController = require('../controllers/itinerary');
var itineraryController = new ItineraryController();

// Routes
Itinerary.methods(['get', 'put', 'delete']);

Itinerary.route('.post', function(req, res, next) {
	itineraryController.insert(req.body, function (itinerary, error) {
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			res.json(itinerary);
		}
	});
});

Itinerary.route('closest.post', function(req, res, next) {
	itineraryController.Closest(req.body, function (itinerary, error) {
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			res.json(itinerary);
		}
	});
});

Itinerary.route('closests.post', function(req, res, next) {
	itineraryController.Closests(req.body, function (itinerary, error) {
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			res.json(itinerary);
		}
	});
});

Itinerary.register(router, '/itineraries');

module.exports = router;