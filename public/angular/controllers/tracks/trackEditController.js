angular.module('Curve')
	.controller('trackEditController', ['$scope', '$routeParams', '$window', 'Session', 'Track', 'Parent', 'Settings', 'Notification', 'Loader',
		function($scope, $routeParams, $window, Session, Track, Parent, Settings, Notification, Loader) {
		var controller = this;
		$scope.track = { salesReturnsRights: [], costsRights: [] };
		$scope.contracts = [];
		if($routeParams.id) {
			Loader.load();
			Track.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.track = response.data;
					Loader.complete();
				} else {
					Loader.error('Error loading track, please try again or contact support');
				}
			});
		} 

		$(".sidebar-menu-item").removeClass('active');
		$(".sidebar-menu ul li.sidebar-menu-item span.icon-thumbnail").removeClass('bg-success');
		$(".sidebar-menu ul li.sidebar-menu-item ul.sub-menu li.sub-menu-item span.icon-thumbnail").removeClass('white');
		$(".sidebar-menu-item.catalogue").addClass('active');
		$(".sidebar-menu-item.catalogue").find("span.icon-thumbnail:first").addClass('bg-success');
		$(".track-item").find("span.icon-thumbnail").addClass('white');

		Settings.getContracts()
			.then(function(contracts){
				$scope.contracts = contracts; 
			});
		
		$scope.addSalesReturnsRights = function() {
			$scope.track.salesReturnsRights.push({});
		}
		$scope.deleteSalesReturnsRights = function(contract) {
			var index = $scope.track.salesReturnsRights.indexOf(contract);
			$scope.track.salesReturnsRights.splice(index, 1);
		}
		$scope.addCostsRights = function() {
			$scope.track.costsRights.push({});  
		}
		$scope.deleteCostsRights = function(contract) {
			var index = $scope.track.costsRights.indexOf(contract);
			$scope.track.costsRights.splice(index, 1);
		}
		$scope.$watch('track.aliases', function(aliases) {
			$scope.displayAliases = []
			angular.forEach(aliases, function(alias) {
				$scope.displayAliases.push({ name: alias });
			});
		});
		$scope.addAlias = function() {
			$scope.displayAliases.push("");
			updateAliases();
		}
		$scope.deleteAlias = function(alias) {
			var index = $scope.displayAliases.indexOf(alias);
			$scope.displayAliases.splice(index, 1);
		}
		function updateAliases(callback) {
			$scope.track.aliases = []
			if($scope.displayAliases.length > 0) {
				angular.forEach($scope.displayAliases, function(alias) {
					$scope.track.aliases.push(alias.name);
					if($scope.track.aliases.length == $scope.displayAliases.length) {
						if(callback) { callback(); }
					}
				});
			} else {
				if(callback) { callback(); }
			}
		}
		// Tabs
		$scope.activeTab = "overview";
		$scope.setTab = function(value) {
			$scope.activeTab = value;
		}
		$scope.save = function() {
			Loader.load();
			updateAliases(function() {
				if(!$scope.track._id) {
					Track.create($scope.track, function(response) {
						if(response.status == 200) {
							$window.location.href = "#/tracks/" + response.data._id + "/edit";
							Loader.success('Track successfully created');
						} else {
							Loader.error('Error creating track, please try again or contact support');
						}
					})
					.catch(function(response){
						if(response.status == 400) {
							Loader.error('The object has not been saved.  ' + response.data.message);
						}
					});
				} else {
					Track.update($scope.track._id, $scope.track, function(response) {
						if(response.status == 200) {
							$scope.track = response.data;
							Loader.success('Track successfully saved');
						} else {
							Loader.error('Error saving track, please try again or contact support');
						}
					})
					.catch(function(response){
						if(response.status == 400) {
							Loader.error('The object has not been saved.  ' + response.data.message);
						}
					});
				}
			});
		}
		$scope.delete = function() {
			Loader.load();
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Track.delete($scope.track._id, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/tracks";
						Loader.success('Track successfully deleted');
					} else {
						Loader.error('Error deleting client, please try again or contact support');
					}
				});
			});
		}
	}]);