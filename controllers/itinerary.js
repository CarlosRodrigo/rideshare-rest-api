var itinerary = require('../models/itinerary');
var user = require('../models/user');

function ItineraryController () {

}

ItineraryController.prototype.getById = function(idUser, callback) {
	console.log(idUser);
	itinerary.find({UserId: idUser},function (error, itinerary) {
		if(error){
			callback(null, error);
		}else{
			console.log(itinerary);
			callback(itinerary);
		}
	})
};

module.exports = ItineraryController;