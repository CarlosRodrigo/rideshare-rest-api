// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

var config = require('./config');

// MongoDB
mongoose.connect(config.database);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('superSecret', config.secret);
global.getSuperSecret = app.get('superSecret');

app.use(function (req, res, next) {
	if (req.url.indexOf('/login') >= 0 || (req.url.indexOf('/signup') >= 0 && req.method == 'POST')) {
		next();
	} else {
		var token = req.body.token  || req.query.token || req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, global.getSuperSecret, function (error, decoded) {
				if (error) {
					return res.json({
						success: false,
						message: 'Token inválido'
					});
				} else {
					req.decoded = decoded;
					next();
				}
			})
		} else {
			return res.status(403).send({
				success: false,
				message: 'Nenhum token enviado'
			});
		}
	}
});

// Routes
app.use('/api', require('./routes/signup'));
app.use('/api', require('./routes/login'));
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/itinerary'));

// Start Server
var port = Number(process.env.PORT || 8080);

app.listen(port, function () {
	console.log('Server running at port ' + port);
});