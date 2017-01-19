angular.module('Curve')
	.controller('releaseEditController', ['$scope', '$routeParams', '$window', 'Session', 'Release', 'Notification', function($scope, $routeParams, $window, Session, Release, Notification) {
		var controller = this;
		$scope.release = { aliases: [] };
		$scope.formats = ["CD", "LP", "Digital"];
		$scope.priceCategories = ["Price Cat 1", "Price Cat 2"];
		$scope.contracts = [{ _id: "1234", name: "Contract 1" }, { _id: "12345", name: "Contract 2" }];
		if($routeParams.id) {
			Release.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.release = response.data;
					$scope.release.releaseDate = new Date(response.data.releaseDate);
				} else {
					Notification.error('Error loading release, please try again or contact support');
				}
			});
		}
		$scope.releaseDatePopup = false;
		$scope.openReleaseDatePopup = function() {
			$scope.releaseDatePopup = true;
		}
		$scope.addSalesReturnsRights = function() {
			$scope.release.salesReturnsRights.push({});
		}
		$scope.deleteSalesReturnsRights = function(contract) {
			var index = $scope.release.salesReturnsRights.indexOf(contract);
			$scope.release.salesReturnsRights.splice(index, 1);
		}
		$scope.addCostsRights = function() {
			$scope.release.costsRights.push({});
		}
		$scope.deleteCostsRights = function(contract) {
			var index = $scope.release.costsRights.indexOf(contract);
			$scope.release.costsRights.splice(index, 1);
		}
		$scope.$watch('release.aliases', function(aliases) {
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
			$scope.release.aliases = []
			if($scope.displayAliases.length > 0) {
				angular.forEach($scope.displayAliases, function(alias) {
					$scope.release.aliases.push(alias.name);
					if($scope.release.aliases.length == $scope.displayAliases.length) {
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
				if(!$scope.release._id) {
					Release.create($scope.release, function(response) {
						if(response.status == 200) {
							Notification.success('Release successfully created');
							$window.location.href = "#/releases/" + response.data._id + "/edit"
						} else {
							Notification.error('Error creating release, please try again or contact support');
						}
					});
				} else {
					Release.update($scope.release._id, $scope.release, function(response) {
						if(response.status == 200) {
							$scope.release = response.data;
							$scope.release.releaseDate = new Date(response.data.releaseDate);
							Notification.success('Release successfully saved');
						} else {
							Notification.error('Error saving release, please try again or contact support');
						}
					});
				}
			});
		}
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Release.delete($scope.release._id, function(response) {
					if(response.status == 200) {
						Notification.success('Release successfully deleted');
						$window.location.href = "#/releases"
					} else {
						Notification.error('Error deleting client, please try again or contact support');
					}
				});
			});
		}
	}]);