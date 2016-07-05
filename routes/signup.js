// Dependencies
var express = require('express');
var router = express.Router();

// Controllers
var UserController = require('../controllers/user');
var userController = new UserController();

router.route('/signup').post(function (req, res) {	
	userController.insert(req.body, function (user, error) {
		if (error) {
			res.status(400);
			res.send(error);
		} else {
			res.json(user);
		}
	});
});

module.exports = router;