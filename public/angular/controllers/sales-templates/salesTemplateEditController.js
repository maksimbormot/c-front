angular.module('Curve')
	.controller('salesTemplateEditController', ['$scope', '$routeParams', '$window', 'Session', 'SalesTemplate', 'Notification', function($scope, $routeParams, $window, Session, SalesTemplate, Notification) {
		var controller = this;
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
		$scope.template = {};
		// Load Template if ID exists
		if($routeParams.id) {
			SalesTemplate.get($routeParams.id, function(response) { 
				if(response.status == 200) {
					$scope.template = response.data;
				} else {
					Notification.error('Error loading template, please try again or contact support');
				}
			});
		};
		$scope.save = function() {
			if(!$scope.template._id) {
				SalesTemplate.create($scope.template, function(response) {
					if(response.status == 200) {
						Notification.success('Template successfully created');
						$window.location.href = "#/templates/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating template, please try again or contact support');
					}
				});
			} else {
				console.log($scope.template);
				SalesTemplate.update($scope.template._id, $scope.template, function(response) {
					if(response.status == 200) {
						$scope.template = response.data;
						Notification.success('Template successfully saved');
					} else {
						Notification.error('Error saving template, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				SalesTemplate.delete($scope.template._id, function(response) {
					if(response.status == 200) {
						Notification.success('Template successfully deleted');
						$window.location.href = "#/templates"
					} else {
						Notification.error('Error deleting template, please try again or contact support');
					}
				});
			});
		};
	}]);