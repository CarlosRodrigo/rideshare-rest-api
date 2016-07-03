// Dependencies
var express = require('express');
var router = express.Router();

// Controllers
var ItineraryController = require('../controllers/itinerary');
var itineraryController = new ItineraryController();

// Models
var User = require('../models/user');

// Routes
User.methods(['get', 'post', 'put', 'delete']);

User.route('itineraries', {
	detail: true,
	handler: function(req, res, next) {
		itineraryController.getById(req.params.id, function (users, error) {
			if (error) {
				res.status(404);
				res.send(error);
			} else {
				res.json(users);
			}
		});
	}
});

User.register(router, '/users');

module.exports = router;