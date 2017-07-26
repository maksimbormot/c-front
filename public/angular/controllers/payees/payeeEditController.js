angular.module('Curve')
	.controller('payeeEditController', ['$scope', '$routeParams', '$window', 'Session', 'Payee', 'Parent', 'Notification', 'Territories', 'Loader',
		function($scope, $routeParams, $window, Session, Payee, Parent, Notification, Territories, Loader) {
		var controller = this;
		$scope.payee = {};
		$scope.countries = Territories;
		//$scope.countries = ["United Kingdom", "United States", "France"];
		// Load Payee if ID exists
		if($routeParams.id) {
			Loader.load();
			Payee.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.payee = response.data;
					Loader.complete();
				} else {
					Loader.error('Error loading payee, please try again or contact support');
				}
			});
		};
		$scope.groupFind = function(country){
			return country.continent;
		} 
		$scope.save = function() {
			Loader.load();
			if(!$scope.payee._id) {
				Payee.create($scope.payee, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/payees/" + response.data._id + "/edit";
						Loader.success('Payee successfully created');
					} else {
						Loader.error('Error creating payee, please try again or contact support');
					}
				})
				.catch(function(response){
					Loader.error('The object has not been saved.  ' + response.data.message);
				});
			} else {
				Payee.update($scope.payee._id, $scope.payee, function(response) {
					if(response.status == 200) {
						$scope.payee = response.data;
						Loader.success('Payee successfully saved');
					} else {
						Loader.error('Error saving payee, please try again or contact support');
					}
				})
				.catch(function(response){
					Loader.error('The object has not been saved.  ' + response.data.message);
				});
			}
		};
		$scope.delete = function() {
			Loader.load();
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Payee.delete($scope.payee._id, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/payees";
						Loader.success('Payee successfully deleted');
					} else {
						Loader.error('Error deleting payee, please try again or contact support');
					}
				});
			});
		};
	}]);