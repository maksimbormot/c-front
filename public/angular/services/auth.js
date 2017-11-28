angular.module('Curve')
	.factory('Auth', function AuthFactory($http, $rootScope, $cookies, Session, jwtHelper){
		return {
			test: function(token, callback) {
				if(window.location.origin === "http://localhost:8082") {
					Session.apiUrl = "http://localhost:8081";
				} else if(window.location.origin === "http://staging.curveroyaltysystems.com:8082" || window.location.origin == "http://Curve-tomallen654558.codeanyapp.com:8082") {
					Session.apiUrl = "http://staging.curveroyaltysystems.com:8081";
				} else {
					Session.apiUrl = "http://staging.curveroyaltysystems.com:8081";
				}
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
						} else {
							window.location.replace(window.location.origin + '/login');
						}
						callback(Session);
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
