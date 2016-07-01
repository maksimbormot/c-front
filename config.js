console.log("ENV: " + process.env.NODE_ENV);
if(process.env.NODE_ENV == 'development') {
	module.exports.apiUri = "http://localhost:8081"
} else if(process.env.NODE_ENV == 'production') {
	// Change once production environment is set up
	module.exports.apiUri = "http://localhost:8081"
}

