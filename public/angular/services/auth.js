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
							Session.clientId = tokenPayload.clientId;
							Session.parentId = tokenPayload.parentId;
							Session.payeeId = tokenPayload.payeeId;
							Session.id = tokenPayload.id;
							Session.userType = data.userType;
							$rootScope.$broadcast('user-logged-in', Session);
							callback(Session);
						} else {
							window.location.replace(window.location.origin + '/login');
							callback(Session);
						}
					}).error(function(data) {
						window.location.replace(window.location.origin + '/login');
						callback(Session);
					});
				} else {
					window.location.replace(window.location.origin + '/login');
					callback(Session);
				}
			},
			logout: function() {
				$cookies.remove('curveToken');
				location.href = '/';
			}
		}
	});
