// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var config = require('./config');

// MongoDB
mongoose.connect(config.database);

// Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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