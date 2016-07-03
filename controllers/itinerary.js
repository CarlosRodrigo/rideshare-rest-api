var itinerary = require('../models/itinerary');

function ItineraryController () {

}

ItineraryController.prototype.getById = function(idUser, callback) {
	console.log(idUser);
	itinerary.findOne({User: idUser},function (error, itinerary) {
		if(error){
			callback(null, error);
		}else{
			console.log(itinerary);
			callback(itinerary);
		}
	})
};

module.exports = ItineraryController;