// Models
var User = require('../models/user');

// Helpers
var Functions = require('../util/functions');

function UserController () {
	this.functions = new Functions();
}

UserController.prototype.insert = function(_user, callback) {
	var functions = this.functions;
	User.find({ email: _user.email }, function (error, users) {
		if (error) {
			callback(null, error);
		} else {
			if (_user && _user.email && _user.password && _user.name) {
				if (functions.validateEmail(_user.email)) {
					if (_user.password.length > 5) {
						if (users.length == 0) {
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
						} else {
							callback({error: 'Email já existente'})
						}
					} else {
						callback({error: 'Senha inválida.'})
					}
				} else {
					callback({error: 'Email inválido.'})
				}
			} else {
				callback({error: 'Campos inválidos.'})
			}
		}
	});
};

UserController.prototype.login = function(_users, callback) {
	if (_users && _users.email && _users.password) {
		User.find({ email: _users.email, password: _users.password }, function (error, users) {
			if (error) {
				callback(null, error);
			} else {
				if (users.length > 0) {
					callback(users[0]);
				} else {
					callback(null, { error: 'Email ou senha inválidos.' });
				}
			}
		});
	} else {
		callback(null, { error: 'Email ou senha inválidos.' });
	}
};

module.exports = UserController;