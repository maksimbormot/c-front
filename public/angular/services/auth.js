angular.module('Curve')
	.factory('Auth', function AuthFactory($http, $rootScope, $cookies, Session){
		return {
			test: function(token) {
				if(token) {
					$http({ method: 'GET', url: 'http://localhost:8081/authenticate/test_token?applicationToken=12345&token=' + token }).success(function(data){
						if(data.success == true) {
							Session.isLoggedIn = true;
							Session.token =  data.token;
							Session.userType = data.user_type;
							$rootScope.$broadcast('user-logged-in', Session);
						} else {
							window.location.replace(window.location.origin + '/login');
						}
					});
				} else {
					window.location.replace(window.location.origin + '/login');
				}
			},
			logout: function() {
				$cookies.remove('curveToken');
				location.href = '/';
			}
		}
	});