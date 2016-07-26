angular.module('Curve')
	.controller('applicationController', ['$scope', '$cookies', 'Session', 'Auth', function($scope, $cookies, Session, Auth) {
		var controller = this;
		$scope.isLoggedIn = Session.isLoggedIn;
		$scope.internalUser = false;
		Auth.test($cookies.get('curveToken'));
		$scope.logout = function() {
			Auth.logout();
		}
	}]);