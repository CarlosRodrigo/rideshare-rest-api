// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var schema = restful.mongoose.Schema;

// Schema
var itinerarySchema = new mongoose.Schema({
	StartLocation: String,
	FinalDestination: String,
	DepartureTime: String,
	ArrivalTime: String,
	UserId: String
});

// Return model
module.exports = restful.model('itineraries', itinerarySchema);