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
	User: {
		type: schema.Types.ObjectId, ref: 'user'
	}
});

// Return model
module.exports = restful.model('itineraries', itinerarySchema);