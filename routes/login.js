// Dependencies
var express = require('express');
var router = express.Router();

// Controllers
var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/login').post(function (req, res) {	
	userController.login(req.body, function (user, error) {
		if (error) {
			res.status(401);
			res.send(error);
		} else {
			res.json(user);
		}
	});
});

module.exports = router;