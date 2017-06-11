angular.module('Curve')
	.controller('costEditController', ['$scope', '$routeParams', '$window', 'Session', 'Cost', 'Notification', function($scope, $routeParams, $window, Session, Cost, Notification) {
		var controller = this;
		$scope.costsTypes = ["Gross Receipts","Net Receipts", "PPD"];
		// $scope.parents = [{}];
		// $scope.paymentTiers = ["Standard", "Premium", "Enterprise"];
		// $scope.$on('$viewContentLoaded', function() {
		// 	Parent.all({}, function(response) {
		// 		if(response.status == 200 && response.data && response.data.parents) {
		// 			response.data.parents.forEach(function(parent) {
		// 				$scope.parents.push(parent);  
		// 			});
		// 		}
		// 	});
		// }); 
		$scope.cost = {};
		// Load Cost if ID exists
		if($routeParams.id) {
			Cost.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.cost = response.data;
				} else {
					Notification.error('Error loading cost, please try again or contact support');
				}
			});
		};
		$scope.save = function() {
			if(!$scope.cost._id) {
				Cost.create($scope.cost, function(response) {
					if(response.status == 200) {
						Notification.success('Cost successfully created');
						$window.location.href = "#/costs/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating cost, please try again or contact support');
					}
				});
			} else {
				console.log($scope.cost);
				Cost.update($scope.cost._id, $scope.cost, function(response) {
					if(response.status == 200) {
						$scope.costEditController = response.data;
						Notification.success('Cost successfully saved');
					} else {
						Notification.error('Error saving cost, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Cost.delete($scope.ccost._id, function(response) {
					if(response.status == 200) {
						Notification.success('Cost successfully deleted');
						$window.location.href = "#/costs"
					} else {
						Notification.error('Error deleting cost, please try again or contact support');
					}
				});
			});
		};
	}]);