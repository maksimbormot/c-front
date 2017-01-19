angular.module('Curve')
	.controller('clientEditController', ['$scope', '$routeParams', '$window', 'Session', 'Client', 'Parent', 'Notification', function($scope, $routeParams, $window, Session, Client, Parent, Notification) {
		var controller = this;
		$scope.parents = [{}];
		$scope.paymentTiers = ["Standard", "Premium", "Enterprise"];
		$scope.$on('$viewContentLoaded', function() {
			Parent.all({}, function(response) {
				if(response.status == 200 && response.data && response.data.parents) {
					response.data.parents.forEach(function(parent) {
						$scope.parents.push(parent);
					});
				}
			});
		});
		$scope.client = {};
		// Load Client if ID exists
		if($routeParams.id) {
			Client.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.client = response.data;
				} else {
					Notification.error('Error loading client, please try again or contact support');
				}
			});
		};
		$scope.save = function() {
			if(!$scope.client._id) {
				Client.create($scope.client, function(response) {
					if(response.status == 200) {
						Notification.success('Client successfully created');
						$window.location.href = "#/clients/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating client, please try again or contact support');
					}
				});
			} else {
				console.log($scope.client);
				Client.update($scope.client._id, $scope.client, function(response) {
					if(response.status == 200) {
						$scope.client = response.data;
						Notification.success('Client successfully saved');
					} else {
						Notification.error('Error saving client, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Client.delete($scope.client._id, function(response) {
					if(response.status == 200) {
						Notification.success('Client successfully deleted');
						$window.location.href = "#/clients"
					} else {
						Notification.error('Error deleting client, please try again or contact support');
					}
				});
			});
		};
	}]);