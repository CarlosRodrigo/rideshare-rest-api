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

Itinerary.route('distance.post', function(req, res, next) {
	itineraryController.Distance(req.body, function (distance, error) {
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			res.json(distance);
		}
	});
});

Itinerary.route('duration.post', function(req, res, next) {
	itineraryController.Duration(req.body, function (distance, error) {
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			res.json(distance);
		}
	});
});

Itinerary.route('calcFare.post', function(req, res, next) {
	itineraryController.CalcFare(req.body, function(fares, error){
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			res.json(fares);
		}
	});
});

Itinerary.register(router, '/itineraries');

module.exports = router;