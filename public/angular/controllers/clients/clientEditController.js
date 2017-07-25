angular.module('Curve')
	.controller('clientEditController', ['$scope', '$routeParams', '$window', 'Session', 'Client', 'Parent', 'Notification', 'Loader',
		function($scope, $routeParams, $window, Session, Client, Parent, Notification, Loader) {
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
			Loader.load();
			Client.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.client = response.data;
					Loader.complete();
				} else {
					Loader.error('Error loading client, please try again or contact support');
				}
			});
		};
		$scope.save = function() {
			Loader.load();
			if(!$scope.client._id) {
				Client.create($scope.client, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/clients/" + response.data._id + "/edit";
						Loader.success('Client successfully created');
					} else {
						Loader.error('Error creating client, please try again or contact support');
					}
				});
			} else {
				console.log($scope.client);
				Client.update($scope.client._id, $scope.client, function(response) {
					if(response.status == 200) {
						$scope.client = response.data;
						Loader.success('Client successfully saved');
					} else {
						Loader.error('Error saving client, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			Loader.load();
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Client.delete($scope.client._id, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/clients";
						Loader.success('Client successfully deleted');
					} else {
						Loader.error('Error deleting client, please try again or contact support');
					}
				});
			});
		};
	}]);