angular.module('Curve')
	.factory('Auth', function AuthFactory($http, $rootScope, $cookies, Session, jwtHelper){
		return {
			test: function(token, callback) {
				if(window.location.origin === "http://localhost:8082") {
					Session.apiUrl = "http://localhost:8081";
				} else if(window.location.origin === "https://staging.curveroyaltysystems.com" || window.location.origin == "http://Curve-tomallen654558.codeanyapp.com:8082") {
					Session.apiUrl = "https://staging-api.curveroyaltysystems.com";
				} else {
					Session.apiUrl = "https://api.curveroyaltysystems.com";
				}
				console.log(Session.apiUrl);
				if(token) {
					$http({ method: 'GET', url: Session.apiUrl + '/authenticate/test_token?applicationToken=12345&token=' + token }).success(function(data){
						if(data.success == true) {
							Session.isLoggedIn = true;
							Session.token =  data.token;
							var tokenPayload = jwtHelper.decodeToken(Session.token);	
							Session.id = tokenPayload.id;						
							Session.userType = data.userType;
							$rootScope.$broadcast('user-logged-in', Session);
							callback(Session);
						} else {
							window.location.replace(window.location.origin + '/login.html');
							callback(Session);
						}
					}).error(function(data) {
						console.log(data);
						window.location.replace(window.location.origin + '/login.html');
						callback(Session);
					});
				} else {
					window.location.replace(window.location.origin + '/login.html');
					callback(Session);
				}
			},
			logout: function() {
				$cookies.remove('curveToken');
				location.href = '/';
			}
		}
	});