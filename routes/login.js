// Dependencies
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

// Controllers
var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/login').post(function (req, res) {	
	userController.login(req.body, function (user, error) {
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			console.log(user._id);
			var token = jwt.sign(user._id, global.getSuperSecret, {
				expiresIn: '1h'
			});

			res.json({
				user: user,
				token: token
			});
		}
	});
});

module.exports = router;