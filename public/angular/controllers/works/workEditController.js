angular.module('Curve')
	.controller('workEditController', ['$scope', '$routeParams', '$window', 'Session', 'Work', 'Parent', 'Notification', function($scope, $routeParams, $window, Session, Work, Parent, Notification) {
		var controller = this;
		$scope.work = { salesReturnsRights: [], costsRights: [] };
		$scope.contracts = [{ _id: "1234", name: "Contract 1" }, { _id: "12345", name: "Contract 2" }];
		if($routeParams.id) {
			Work.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.work = response.data;
				} else {
					Notification.error('Error loading work, please try again or contact support');
				}
			});
		}
		$scope.addSalesReturnsRights = function() {
			$scope.work.salesReturnsRights.push({});
		}
		$scope.deleteSalesReturnsRights = function(contract) {
			var index = $scope.work.salesReturnsRights.indexOf(contract);
			$scope.work.salesReturnsRights.splice(index, 1);
		}
		$scope.addCostsRights = function() {
			$scope.work.costsRights.push({});
		}
		$scope.deleteCostsRights = function(contract) {
			var index = $scope.work.costsRights.indexOf(contract);
			$scope.work.costsRights.splice(index, 1);
		}
		$scope.$watch('work.aliases', function(aliases) {
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
			$scope.work.aliases = []
			if($scope.displayAliases.length > 0) {
				angular.forEach($scope.displayAliases, function(alias) {
					$scope.work.aliases.push(alias.name);
					if($scope.work.aliases.length == $scope.displayAliases.length) {
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
				if(!$scope.work._id) {
					Work.create($scope.work, function(response) {
						if(response.status == 200) {
							Notification.success('Work successfully created');
							$window.location.href = "#/works/" + response.data._id + "/edit"
						} else {
							Notification.error('Error creating work, please try again or contact support');
						}
					});
				} else {
					Work.update($scope.work._id, $scope.work, function(response) {
						if(response.status == 200) {
							$scope.work = response.data;
							Notification.success('Work successfully saved');
						} else {
							Notification.error('Error saving work, please try again or contact support');
						}
					});
				}
			});
		}
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Work.delete($scope.work._id, function(response) {
					if(response.status == 200) {
						Notification.success('Work successfully deleted');
						$window.location.href = "#/works"
					} else {
						Notification.error('Error deleting client, please try again or contact support');
					}
				});
			});
		}
	}]);