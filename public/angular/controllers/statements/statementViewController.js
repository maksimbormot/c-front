angular.module('Curve')
	.controller('statementViewController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Statement', 'Notification', 'Loader',
		function($scope, $routeParams, Session, Pagination, Statement, Notification, Loader) {
		var controller = this;

		// Load Period if ID exists
    if($routeParams.id) {
      Loader.load();
      Statement.get($routeParams.id, function(response) {
        if(response.status == 200) {
          $scope.statement = response.data;
          Loader.complete();
        } else {
          Loader.error('Error loading statement, please try again or contact support');
        }
      });
    };

    // Tabs
    $scope.activeTab = "overview";
    $scope.setTab = function(value) {
      $scope.activeTab = value;
    }

	}]);