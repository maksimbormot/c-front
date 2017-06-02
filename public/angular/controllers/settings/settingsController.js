angular.module('Curve')
	.controller('settingsController', ['$scope', '$routeParams', 'Session', 'Client', 'Parent', 'Payee', 'User', 'Notification', function($scope, $routeParams, Session, Client, Parent, Payee, User, Notification) {
		var controller = this;
		$scope.client = { distributionChannels: [], configurations: [], priceCategories: []};
		$scope.client = {};
		$scope.user = {};

		if(Session.id){
			if (Session.userType == 'internal' || Session.userType == 'parent' || Session.userType == 'payee'){
				User.get(Session.id, function(response) {
					if(response.status == 200) {
						$scope.user = response.data;
					} else {
						Notification.error('Error loading user, please try again or contact support');
					}
				});
				$scope.userRole = 'internal'; 
			} else if(Session.userType == 'client'){
				User.get(Session.id, function(response) { 
					if(response.status == 200) {
						$scope.user = response.data;
						if ($scope.user.clientId){
							Client.get($scope.user.clientId, function(response) {
								if(response.status == 200) {
									$scope.client = response.data;
								} else {
									Notification.error('Error loading client, please try again or contact support');
								}
							});					
						}
					} else {
						Notification.error('Error loading user, please try again or contact support');
					}
				});
				$scope.userRole = 'client';
			}			
		}

		$scope.$watch('client.distributionChannels', function(distributionChannels) {
			$scope.displayDistributionChannels = []
			angular.forEach(distributionChannels, function(channel) {
				$scope.displayDistributionChannels.push({ name: channel });
			});
		});
		$scope.addDistributionChannel = function() {
			$scope.displayDistributionChannels.push("");
			updateDistributionhannels();
		}
		$scope.deleteDistributionChannel = function(channel) {
			var index = $scope.displayDistributionChannels.indexOf(channel);
			$scope.displayDistributionChannels.splice(index, 1);
		}
		function updateDistributionhannels(callback) {
			$scope.client.distributionChannels = [];
			if($scope.displayDistributionChannels.length > 0) {
				angular.forEach($scope.displayDistributionChannels, function(channel) {
					$scope.client.distributionChannels.push(channel.name);
					if($scope.client.distributionChannels.length == $scope.displayDistributionChannels.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

		$scope.$watch('client.configurations', function(configurations) {
			$scope.displayConfigurations = []
			angular.forEach(configurations, function(configuration) {
				$scope.displayConfigurations.push({ name: configuration });
			});
		});
		$scope.addConfiguration = function() {
			$scope.displayConfigurations.push("");
			updateConfigurations();
		}
		$scope.deleteConfiguration = function(configuration) {
			var index = $scope.displayConfigurations.indexOf(configuration);
			$scope.displayConfigurations.splice(index, 1);
		}
		function updateConfigurations(callback) {
			$scope.client.configurations = []
			if($scope.displayConfigurations.length > 0) {
				angular.forEach($scope.displayConfigurations, function(configuration) {
					$scope.client.configurations.push(configuration.name);
					if($scope.client.configurations.length == $scope.displayConfigurations.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

		$scope.$watch('client.priceCategories', function(priceCategories) {
			$scope.displayPriceCategories = []
			angular.forEach(priceCategories, function(category) {
				$scope.displayPriceCategories.push({ name: category });
			});
		});
		$scope.addPriceCategory = function() {
			$scope.displayPriceCategories.push("");
			updatePriceCategories();
		}
		$scope.deletePriceCategory = function(category) {
			var index = $scope.displayPriceCategories.indexOf(category);
			$scope.displayPriceCategories.splice(index, 1);
		}
		function updatePriceCategories(callback) {
			$scope.client.priceCategories = []
			if($scope.displayPriceCategories.length > 0) {
				angular.forEach($scope.displayPriceCategories, function(category) {
					$scope.client.priceCategories.push(category.name);
					if($scope.client.priceCategories.length == $scope.displayPriceCategories.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

		$scope.saveSettings = function() {
			if ($scope.user.newPassword === $scope.user.confirmNewPassword){
				User.update($scope.user._id, $scope.user, function(response) {
					if(response.status == 200) {
						$scope.user = response.data;
						if ($scope.client._id) {
							updatePriceCategories();
							updateConfigurations();
							updateDistributionhannels();
							Client.update($scope.client._id, $scope.client, function(response) {
								if(response.status == 200) {
									$scope.client = response.data;
								} else {
									Notification.error('Error saving settings, please try again or contact support');
								}
							});
						} 
						Notification.success('Settings successfully saved');
					}
				});
			} else {
				Notification.error('Passwords do not match');
			}
		}

	}]);