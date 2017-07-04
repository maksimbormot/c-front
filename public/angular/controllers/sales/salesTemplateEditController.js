angular.module('Curve')
	.controller('salesTemplateEditController', ['$scope', '$routeParams', '$window', 'Session', 'SalesTemplate', 'Notification', 'Settings', 'Territories', 'Upload', 'TemplateFields', 'TemplateTypes', function($scope, $routeParams, $window, Session, SalesTemplate, Notification, Settings, Territories, Upload, TemplateFields, TemplateTypes) {
		var controller = this;
		$scope.territories = Territories; 
		$scope.templateFields = TemplateFields; 
		$scope.templateTypes = TemplateTypes; 
		$scope.token = '?applicationToken=12345&token=' + Session.token;
		$scope.salesTemplate = {territories:[], distributionChannels: [], configurations: [], priceCategories: []};
		$scope.salesTemplate.fields = [];
		$scope.salesTemplate.exampleLines = [];

		// Load Template if ID exists
		if($routeParams.id) {
			SalesTemplate.get($routeParams.id, function(response) { 
				if(response.status == 200) {
					$scope.salesTemplate = response.data;
				} else {
					Notification.error('Error loading template, please try again or contact support');
				}
			});
		};
 
		Settings.getSettings()
			.then(function(settings){
				angular.extend($scope, settings);
			});

		$scope.$watch('salesTemplate.territories', function(territories) {
			$scope.displayTerritories = []
			angular.forEach(territories, function(territory) {
				$scope.displayTerritories.push({ name: territory.name, map: territory.map });
			});
		});
		$scope.addTerritory = function() {
			$scope.displayTerritories.push("");
			updateTerritories();
		}
		$scope.deleteTerritory = function(territory) {
			var index = $scope.displayTerritories.indexOf(territory);
			$scope.displayTerritories.splice(index, 1);
		}
		function updateTerritories(callback) {
			$scope.salesTemplate.territories = [];
			if($scope.displayTerritories.length > 0) {
				angular.forEach($scope.displayTerritories, function(territory) {
					$scope.salesTemplate.territories.push({ name: territory.name, map: territory.map });
					if($scope.salesTemplate.territories.length == $scope.displayTerritories.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

		$scope.$watch('salesTemplate.distributionChannels', function(distributionChannels) {
			$scope.displayDistributionChannels = []
			angular.forEach(distributionChannels, function(channel) {
				$scope.displayDistributionChannels.push({ name: channel.name, map: channel.map });
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
			$scope.salesTemplate.distributionChannels = [];
			if($scope.displayDistributionChannels.length > 0) {
				angular.forEach($scope.displayDistributionChannels, function(channel) {
					$scope.salesTemplate.distributionChannels.push({ name: channel.name, map: channel.map });
					if($scope.salesTemplate.distributionChannels.length == $scope.displayDistributionChannels.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

		$scope.$watch('salesTemplate.configurations', function(configurations) {
			$scope.displayConfigurations = []
			angular.forEach(configurations, function(configuration) {
				$scope.displayConfigurations.push({ name: configuration.name, map: configuration.map });
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
			$scope.salesTemplate.configurations = []
			if($scope.displayConfigurations.length > 0) {
				angular.forEach($scope.displayConfigurations, function(configuration) {
					$scope.salesTemplate.configurations.push({ name: configuration.name, map: configuration.map });
					if($scope.salesTemplate.configurations.length == $scope.displayConfigurations.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

		$scope.$watch('salesTemplate.priceCategories', function(priceCategories) {
			$scope.displayPriceCategories = []
			angular.forEach(priceCategories, function(category) {
				$scope.displayPriceCategories.push({ name: category.name, map: category.map });
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
			$scope.salesTemplate.priceCategories = []
			if($scope.displayPriceCategories.length > 0) {
				angular.forEach($scope.displayPriceCategories, function(category) {
					$scope.salesTemplate.priceCategories.push({ name: category.name, map: category.map });
					if($scope.salesTemplate.priceCategories.length == $scope.displayPriceCategories.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}

	    $scope.upload = function (file) {
			Upload.upload({
		      url: 'http://localhost:8081/salesTemplates/upload'+ $scope.token,
		      method: 'POST',
		      data: {
		      	file: file, 
		      	salesTemplate_id: $scope.salesTemplate._id,
		      	startingLine: $scope.salesTemplate.startingLine,
		      	startingLeft: $scope.salesTemplate.startingLeft,
		      	delimiter: $scope.salesTemplate.lineBreaks
		      }
		    })
		    .then(function(resp){
		    	$scope.salesTemplate.exampleLines = resp.data.template;
		    	for(var i = 0; i < $scope.salesTemplate.exampleLines[0].length; i++){
		    		$scope.salesTemplate.fields[i] = { field: null, type: null};
		    	}
		    })
	    };

		function updateFields(element) {
	    	for(var i = 0; i < $scope.salesTemplate.fields.length; i++){
	    		$scope.salesTemplate.fields[i].field = element.field;
	    		$scope.salesTemplate.fields[i].type = element.type;
	    	}
		}

		$scope.save = function() {
			if(!$scope.salesTemplate._id) {
				updateTerritories();
				updatePriceCategories();
				updateConfigurations();
				updateDistributionhannels();
				SalesTemplate.create($scope.salesTemplate, function(response) {
					if(response.status == 200) {
						Notification.success('Template successfully created');
						$window.location.href = "#/templates/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating template, please try again or contact support');
					}
				});
			} else {
				console.log($scope.salesTemplate);
				updateTerritories();
				updatePriceCategories();
				updateConfigurations();
				updateDistributionhannels();
				SalesTemplate.update($scope.salesTemplate._id, $scope.salesTemplate, function(response) {
					if(response.status == 200) {
						$scope.salesTemplate = response.data;
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
				SalesTemplate.delete($scope.salesTemplate._id, function(response) {
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