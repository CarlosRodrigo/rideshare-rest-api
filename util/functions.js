function Functions () {
	
}

Functions.prototype.validateEmail = function(email) {
	console.log(email);
	var regex = /\S+@\S+\.\S+/;
	return regex.test(email);
};

module.exports = Functions;