// Models
var User = require('../models/user');

function UserController () {

}

UserController.prototype.insert = function(_user, callback) {
	User.find({ email: _user.email }, function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			if (error) {
				callback(null, error);
			} else {
				var user = new User();
				user.name = _user.name;
				user.email = _user.email;
				user.password = _user.password;
				
				user.save(function (error, _user) {
					if (error) {
						callback(null, error);
					} else {
						callback(_user);
					}
				});
			}
		}
	});
};

module.exports = UserController;