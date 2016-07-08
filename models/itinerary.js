// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;
var schema = restful.mongoose.Schema;

// Schema
var itinerarySchema = new mongoose.Schema({
	from: String,
	fromGeoPoint: {
	    type: [Number],  // [<longitude>, <latitude>]
	    index: '2d'      // create the geospatial index
    },
	to: String,
	toGeoPoint: {
	    type: [Number],  // [<longitude>, <latitude>]
	    index: '2d'      // create the geospatial index
    },
	day: String,
	departureTime: String,
	arrivalTime: String,
	userId: String,
	isDriver: Boolean
});

// Return model
module.exports = restful.model('itineraries', itinerarySchema);