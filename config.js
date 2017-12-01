console.log("ENV: " + process.env.NODE_ENV);
if(process.env.NODE_ENV == 'development') {
	module.exports.apiUri = "http://localhost:8081"
} else if(process.env.NODE_ENV == 'staging') {
	module.exports.apiUri = "https://staging-api.curveroyaltysystems.com"
} else {
	module.exports.apiUri = "https://api.curveroyaltysystems.com"
}
module.exports.secret = "RgRjBeB6k5";
