process.env.NODE_ENV = 'development';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var request = require('request');
var config = require('./config');

// Send Index
app.use(express.static(__dirname + '/public'));

// Login Functionality
app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/public/login.html');
});

app.post('/signin', parseUrlencoded, function(req, res) {
	request.post({
		url: config.apiUri + '/authenticate',
		headers: {
			'applicationToken': '12345'
		},
		form: req.body
	}, function(err, httpResponse, body) {
		if(err) { console.log(err); }
		res.status(200).json(JSON.parse(body));
	});

});

app.listen(8082);