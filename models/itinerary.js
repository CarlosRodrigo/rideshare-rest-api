// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var schema = restful.mongoose.Schema;

// Schema
var itinerarySchema = new mongoose.Schema({
	StartLocation: String,
	StartLatitude: String,
	StartLongitude: String,
	FinalDestination: String,
	FinalLatitude: String,
	FinalLongitude: String,
	Day: String,
	DepartureTime: String,
	ArrivalTime: String,
	UserId: String
});

// Return model
module.exports = restful.model('itineraries', itinerarySchema);