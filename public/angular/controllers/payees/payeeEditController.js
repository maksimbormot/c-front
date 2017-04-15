angular.module('Curve')
	.controller('payeeEditController', ['$scope', '$routeParams', '$window', 'Session', 'Payee', 'Parent', 'Notification', function($scope, $routeParams, $window, Session, Payee, Parent, Notification) {
		var controller = this;
		$scope.payee = {};
		$scope.countries = ["United Kingdom", "United States", "France"];
		// Load Payee if ID exists
		if($routeParams.id) {
			Payee.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.payee = response.data;
				} else {
					Notification.error('Error loading payee, please try again or contact support');
				}
			});
		};
		$scope.save = function() {
			if(!$scope.payee._id) {
				Payee.create($scope.payee, function(response) {
					if(response.status == 200) {
						Notification.success('Payee successfully created');
						console.log(response.data);
						$window.location.href = "#/payees/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating payee, please try again or contact support');
					}
				});
			} else {
				Payee.update($scope.payee._id, $scope.payee, function(response) {
					if(response.status == 200) {
						$scope.payee = response.data;
						Notification.success('Payee successfully saved');
					} else {
						Notification.error('Error saving payee, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Payee.delete($scope.payee._id, function(response) {
					if(response.status == 200) {
						Notification.success('Payee successfully deleted');
						$window.location.href = "#/payees"
					} else {
						Notification.error('Error deleting payee, please try again or contact support');
					}
				});
			});
		};
	}]);