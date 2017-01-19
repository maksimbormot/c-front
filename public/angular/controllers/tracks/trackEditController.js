angular.module('Curve')
	.controller('trackEditController', ['$scope', '$routeParams', '$window', 'Session', 'Track', 'Parent', 'Notification', function($scope, $routeParams, $window, Session, Track, Parent, Notification) {
		var controller = this;
		$scope.track = {};
		$scope.contracts = [{ _id: "1234", name: "Contract 1" }, { _id: "12345", name: "Contract 2" }];
		if($routeParams.id) {
			Track.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.track = response.data;
				} else {
					Notification.error('Error loading track, please try again or contact support');
				}
			});
		}
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
			updateAliases(function() {
				if(!$scope.track._id) {
					Track.create($scope.track, function(response) {
						if(response.status == 200) {
							Notification.success('Track successfully created');
							$window.location.href = "#/tracks/" + response.data._id + "/edit"
						} else {
							Notification.error('Error creating track, please try again or contact support');
						}
					});
				} else {
					Track.update($scope.track._id, $scope.track, function(response) {
						if(response.status == 200) {
							$scope.track = response.data;
							Notification.success('Track successfully saved');
						} else {
							Notification.error('Error saving track, please try again or contact support');
						}
					});
				}
			});
		}
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Track.delete($scope.track._id, function(response) {
					if(response.status == 200) {
						Notification.success('Track successfully deleted');
						$window.location.href = "#/tracks"
					} else {
						Notification.error('Error deleting client, please try again or contact support');
					}
				});
			});
		}
	}]);