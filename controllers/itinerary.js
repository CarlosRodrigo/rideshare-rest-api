var request = require('request');
var geocoder = require('geocoder');

var Itinerary = require('../models/itinerary');
var user = require('../models/user');

function ItineraryController () {

}

ItineraryController.prototype.getById = function(idUser, callback) {
	Itinerary.find({userId: idUser},function (error, itinerary) {
		if(error){
			callback(null, error);
		}else{
			callback(itinerary);
		}
	})
};

ItineraryController.prototype.insert = function(_itinerary, callback) {
	geocoder.geocode(_itinerary.from, function ( err, fromConverter ) {
		var fromGeoPoint = [fromConverter.results[0].geometry.location.lat, fromConverter.results[0].geometry.location.lng];
		geocoder.geocode(_itinerary.to, function ( err, toConverter ) {
			var toGeoPoint = [toConverter.results[0].geometry.location.lat, toConverter.results[0].geometry.location.lng];

			var itinerary = new Itinerary();

			itinerary.from = _itinerary.from;
			itinerary.fromGeoPoint = fromGeoPoint;
			itinerary.to = _itinerary.to;
			itinerary.toGeoPoint = toGeoPoint;
			itinerary.day = _itinerary.day;
			itinerary.departureTime = _itinerary.departureTime;
			itinerary.arrivalTime = _itinerary.arrivalTime;
			itinerary.userId = _itinerary.userId;
			itinerary.isDriver = _itinerary.isDriver;

			console.log(itinerary);
			itinerary.save(function (error, _itinerary) {
				if (error) {
					callback(null, error);
				} else {
					callback(_itinerary);
				}
			});
		});
	});
};

module.exports = ItineraryController;