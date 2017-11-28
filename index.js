require('dotenv').config()
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var request = require('request');
var config = require('./config');
var secret = config.secret;
var jwt = require("jsonwebtoken")

// Send Index
app.use(express.static(__dirname + '/public'));

// Login Functionality
app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/public/login.html');
});

app.get('/register', function(req, res) {
	res.sendFile(__dirname + '/public/register.html');
});

app.post('/register',parseUrlencoded, function(req, res) {
	var confirm = req.body.confirm;
	var data = {};
	data.email = req.body.email;
	data.password = req.body.password;
	data.internal = false;
	data.status = "Active"
	data.type = "client"
	if(confirm !== data.password){
		res.status(200).json({success:false, message: "Passwords do not match"});
	}else{
		request.post({
			url: config.apiUri + '/register',
			headers: {
				'applicationToken': '12345'
			},
			form: data
		}, function(err, httpResponse, body) {
			if(err) { console.log(err); }
			res.redirect('/login');
		});
	}
})

app.post('/signin', parseUrlencoded, function(req, res) {
	console.log("API URI: " + config.apiUri);
	request.post({
		url: config.apiUri + '/authenticate',
		headers: {
			'applicationToken': '12345'
		},
		form:req.body
	}, function(err, httpResponse, body) {
		if(err) { console.log(err); }
		res.status(200).json(JSON.parse(body));
	});

});

app.get('/send_email', function(req, res) {
	res.sendFile(__dirname + '/public/send_email.html');
});
app.post('/send_email', parseUrlencoded, function(req, res) {
	var data = {};
	data.email = req.body.email
	request.post({
		url: config.apiUri + '/forgot',
		headers: {
			'applicationToken': '12345'
		},
		form:data
	}, function(err, httpResponse, body) {
		if(err) {
			res.status(200).json(JSON.parse(err));
		}
		res.status(200).json(JSON.parse(body));
	});
});

app.get('/reset', function(req, res) {
	jwt.verify(req.query.token, secret, function(err, decoded) {
		if(!err){
			res.sendFile(__dirname + '/public/reset.html');
		}
		res.sendFile(__dirname + '/public/login.html');
	})
});

app.post('/reset', parseUrlencoded, function(req, res) {
	var token = req.body.token;
	var confirm = req.body.confirm;
	var data = {};
	data.password = req.body.password;
	if(confirm !== data.password) {
		res.status(200).json({success:false, message: "Passwords do not match"});
	}else{
		request.post({
			url: config.apiUri + '/reset' + token,
			headers: {
				'applicationToken': '12345'
			},
			form:data
		}, function(err, httpResponse, body) {
			if(err) {
				res.status(200).json(JSON.parse(err));
			}
			res.status(200).json(JSON.parse(body));
		});
	}
});

app.listen(8082);
