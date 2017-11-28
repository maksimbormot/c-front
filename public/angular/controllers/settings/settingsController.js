angular.module('Curve')
	.controller('settingsController', ['$scope', '$routeParams', 'Session', 'Client', 'Parent', 'Payee', 'User', 'Notification', 'Loader',
		function($scope, $routeParams, Session, Client, Parent, Payee, User, Notification, Loader) {
		var controller = this;
		$scope.client = { distributionChannels: [], configurations: [], priceCategories: [], costTypes: [] };
		$scope.client = {};
		$scope.user = {};

		if(Session.id){
			if (Session.userType == 'internal' || Session.userType == 'parent' || Session.userType == 'payee'){
				Loader.load();
				User.get(Session.id, function(response) {
					if(response.status == 200) {
						$scope.user = response.data.user;
						Loader.complete();
					} else {
						Loader.error('Error loading user, please try again or contact support');
					}
				});
				$scope.userRole = 'internal';
			} else if(Session.userType == 'client'){
				Loader.load();
				User.get(Session.id, function(response) {
					if(response.status == 200) {
						$scope.user = response.data.user;
						if ($scope.user.clientId){
							Client.get($scope.user.clientId, function(response) {
								if(response.status == 200) {
									$scope.client = response.data;
									Loader.complete();
								} else {
									Loader.error('Error loading client, please try again or contact support');
								}
							});
						}
					} else {
						Loader.error('Error loading user, please try again or contact support');
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
			console.log($scope.displayPriceCategories);
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

		$scope.$watch('client.costTypes', function(costTypes) {
			$scope.displayCostTypes = [];
			angular.forEach(costTypes, function(costType) {
				$scope.displayCostTypes.push({ name: costType });
			});
		});
		$scope.addCostType = function() {
			$scope.displayCostTypes.push("");
			updateCostTypes();
		}
		$scope.deleteCostType = function(costType) {
			var index = $scope.displayCostTypes.indexOf(costType);
			$scope.displayCostTypes.splice(index, 1);
		}
		function updateCostTypes(callback) {
			$scope.client.costTypes = []
			if($scope.displayCostTypes.length > 0) {
				angular.forEach($scope.displayCostTypes, function(costType) {
					$scope.client.costTypes.push(costType.name);
					if($scope.client.costTypes.length == $scope.displayCostTypes.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

		$scope.saveSettings = function() {
			Loader.load();
			if ($scope.user.newPassword === $scope.user.confirmNewPassword){
				User.update($scope.user._id, $scope.user, function(response) {
					if(response.status == 200) {
						$scope.user = response.data;
						if ($scope.client._id) {
							updatePriceCategories();
							updateConfigurations();
							updateDistributionhannels();
							updateCostTypes();
							Client.update($scope.client._id, $scope.client, function(response) {
								if(response.status == 200) {
									$scope.client = response.data;
									Loader.complete();
								} else {
									Loader.error('Error saving settings, please try again or contact support');
								}
							});
						}
						Loader.success('Settings successfully saved');
					}
				});
			} else {
				Loader.error('Passwords do not match');
			}
		}

	}]);
