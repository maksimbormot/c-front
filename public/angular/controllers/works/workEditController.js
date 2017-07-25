angular.module('Curve')
	.controller('workEditController', ['$scope', '$routeParams', '$window', 'Session', 'Work', 'Parent', 'Settings', 'Notification', 'Loader',
		function($scope, $routeParams, $window, Session, Work, Parent, Settings, Notification, Loader) {
		var controller = this;
		$scope.work = { salesReturnsRights: [], costsRights: [] };
		$scope.contracts = [];
		if($routeParams.id) {
			Loader.load();
			Work.get($routeParams.id, function(response) {
				if(response.status == 200) {
					$scope.work = response.data;
					Loader.complete();
				} else {
					Loader.error('Error loading work, please try again or contact support');
				}
			});
		}

		$(".sidebar-menu-item").removeClass('active');
		$(".sidebar-menu ul li.sidebar-menu-item span.icon-thumbnail").removeClass('bg-success');
		$(".sidebar-menu ul li.sidebar-menu-item ul.sub-menu li.sub-menu-item span.icon-thumbnail").removeClass('white');
		$(".sidebar-menu-item.catalogue").addClass('active');
		$(".sidebar-menu-item.catalogue").find("span.icon-thumbnail:first").addClass('bg-success');
		$(".work-item").find("span.icon-thumbnail").addClass('white');

		Settings.getContracts()
			.then(function(contracts){
				$scope.contracts = contracts;
			});
		
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
			Loader.load();
			updateAliases(function() {
				if(!$scope.work._id) {
					Work.create($scope.work, function(response) {
						if(response.status == 200) {
							$window.location.href = "#/works/" + response.data._id + "/edit";
							Loader.success('Work successfully created');
						} else {
							Loader.error('Error creating work, please try again or contact support');
						}
					})
					.catch(function(response){
						if(response.status == 400) {
							Loader.error('The object has not been saved.  ' + response.data.message);
						}
					});
				} else {
					Work.update($scope.work._id, $scope.work, function(response) {
						if(response.status == 200) {
							$scope.work = response.data;
							Loader.success('Work successfully saved');
						} else {
							Loader.error('Error saving work, please try again or contact support');
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
				Work.delete($scope.work._id, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/works";
						Loader.success('Work successfully deleted');
					} else {
						Loader.error('Error deleting client, please try again or contact support');
					}
				});
			});
		}
	}]);