angular.module('Curve')
	.factory('Auth', function AuthFactory($http, $rootScope, $cookies, Session){
		return {
			test: function(token, callback) {
				if(token) {
					$http({ method: 'GET', url: 'http://localhost:8081/authenticate/test_token?applicationToken=12345&token=' + token }).success(function(data){
						console.log(data);
						if(data.success == true) {
							Session.isLoggedIn = true;
							Session.token =  data.token;
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