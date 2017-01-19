angular.module('Curve')
	.controller('campaignEditController', ['$scope', '$routeParams', '$window', 'Session', 'Campaign', 'Parent', 'Notification', function($scope, $routeParams, $window, Session, Campaign, Parent, Notification) {
		var controller = this;
		$scope.campaign = {};
		if($routeParams.id) {
			Campaign.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.campaign = response.data;
				} else {
					Notification.error('Error loading campaign, please try again or contact support');
				}
			});
		};
		$scope.save = function() {
			console.log($scope.campaign);
			if(!$scope.campaign._id) {
				Campaign.create($scope.campaign, function(response) {
					if(response.status == 200) {
						Notification.success('Campaign successfully created');
						$window.location.href = "#/campaigns/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating campaign, please try again or contact support');
					}
				});
			} else {
				Campaign.update($scope.campaign._id, $scope.campaign, function(response) {
					if(response.status == 200) {
						$scope.campaign = response.data;
						Notification.success('Campaign successfully saved');
					} else {
						Notification.error('Error saving campaign, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Campaign.delete($scope.campaign._id, function(response) {
					if(response.status == 200) {
						Notification.success('Campaign successfully deleted');
						$window.location.href = "#/campaigns"
					} else {
						Notification.error('Error deleting client, please try again or contact support');
					}
				});
			});
		};
	}]);