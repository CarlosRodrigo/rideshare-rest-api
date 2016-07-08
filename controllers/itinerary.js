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

ItineraryController.prototype.Closest = function(_itinerary, callback) {
	geocoder.geocode(_itinerary.from, function ( err, fromConverter ) {
		var fromGeoPoint = [fromConverter.results[0].geometry.location.lat, fromConverter.results[0].geometry.location.lng];
		var limit = 1;

	    // get coordinates [ <longitude> , <latitude> ]
	    var coords = [];
	    coords[0] = fromGeoPoint[0];
	    coords[1] = fromGeoPoint[1];

	    console.log(coords);

	    var isDriver = false;
	    if (_itinerary.isDriver == "false") {
	    	isDriver = true
	    } 

	    // find a location
	    Itinerary.find({
	    	userId: {$ne: _itinerary.userId},
	    	isDriver: isDriver.toString(),
	    	to: _itinerary.to,
	    	fromGeoPoint: {
	    		$near: coords,
	    	}
	    }).limit(limit).exec(function(error, locations) {
	    	if (error) {
	        	callback(null, error);
	    	}

	      	callback(locations);
	    });
	});
};

ItineraryController.prototype.Closests = function(_itinerary, callback) {
	geocoder.geocode(_itinerary.from, function ( err, fromConverter ) {
		var fromGeoPoint = [fromConverter.results[0].geometry.location.lat, fromConverter.results[0].geometry.location.lng];
	    // get coordinates [ <longitude> , <latitude> ]
	    var coords = [];
	    coords[0] = fromGeoPoint[0];
	    coords[1] = fromGeoPoint[1];

	    var isDriver = false;
	    if (_itinerary.isDriver == "false") {
	    	isDriver = true
	    } 

	    // find a location
	    Itinerary.find({
	    	userId: {$ne: _itinerary.userId},
	    	isDriver: isDriver.toString(),
	    	to: _itinerary.to,
	    	fromGeoPoint: {
	    		$near: coords,
	    	}
	    }, function(error, locations) {
	    	if (error) {
	        	callback(null, error);
	    	}

	      	callback(locations);
	    });
	});
};

ItineraryController.prototype.Distance = function(_itinerary, callback) {
	var from = _itinerary.fromLat + "," + _itinerary.fromLng;
	var to = _itinerary.toLat + "," + _itinerary.toLng;
	// requrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=|"+from+"&destinations=|" + to;

	// request(requrl, function (err, res, body){
	// 	if(!err && res.statusCode == 200){
	// 		data = JSON.parse(body);
	// 		var distance = data.rows[0].elements[0].distance.value;
	// 		callback(distance);
	// 	}
	// });
	callback(calcDistance(from, to));
};

ItineraryController.prototype.Duration = function(_itinerary, callback) {
	var from = _itinerary.fromLat + "," + _itinerary.fromLng;
	var to = _itinerary.toLat + "," + _itinerary.toLng;
	requrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=|"+from+"&destinations=|" + to;

	request(requrl, function (err, res, body){
		if(!err && res.statusCode == 200){
			data = JSON.parse(body);
			var duration = data.rows[0].elements[0].duration.value;
			callback(duration);
		}
	});
};

ItineraryController.prototype.CalcFare = function(itineraries, callback) {
	var itineraryController = new ItineraryController();
	for (var i = 0; i < itineraries.length - 1; i++) {
		var itinerary = {
			fromLat: itineraries[i].fromGeoPoint[0],
			fromLng: itineraries[i].fromGeoPoint[1],
			toLat: itineraries[i+1].fromGeoPoint[0],
			toLng: itineraries[i+1].fromGeoPoint[1]
		}

		// console.log(itinerary);

		var totalDistance;
		var totalDuration;

		itineraryController.Distance(itinerary, function(_distance, error){
			itineraryController.Duration(itinerary, function(_duration, error){
				totalDistance += _distance;
				totalDuration += _duration;
			});	
		});
	}
}

function calcDistance(from, to) {
	requrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=|"+from+"&destinations=|" + to;

	console.log(to);

	request(requrl, function (err, res, body){
		if(!err && res.statusCode == 200){
			data = JSON.parse(body);
			console.log(data);
			var distance = data.rows[0].elements[0].distance.value;
			return distance;
		}
	});
} 
module.exports = ItineraryController;