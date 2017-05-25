angular.module('Curve')
	.controller('contractEditController', ['$scope', '$routeParams', '$window', 'Session', 'Contract', 'Parent', 'Notification', function($scope, $routeParams, $window, Session, Contract, Parent, Notification) {
		var controller = this;
		$scope.contract = { salesTerms: [], returnsTerms: [], costsTerms: [], mechanicalTerms: [], reserves: [] };
		$scope.royaltors = [{ _id: "1234", name: "Royaltor 1" }, { _id: "12345", name: "Royaltor 2" }];
		$scope.accountingPeriods = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];
		$scope.contractTypes = ["Royalty", "Profit Share"];
		$scope.territories = [{ iso2: "GB", name: "United Kingdom" }, { iso2: "US", name: "United States" }];
		$scope.channels = ["Digital", "Physical", "Streaming"];
		$scope.configurations = ["CD", "Download", "LP"];
		$scope.priceCategories = ["Full Price", "Budget"];
		$scope.salesTypes = ["PPD", "Gross Receipts", "Net Receipts"];
		// Load Contract if ID exists
		if($routeParams.id) {
			Contract.get($routeParams.id, function(response) {
				if(response.status == 200) {
					console.log(response.data);
					$scope.contract = response.data;
				} else {
					Notification.error('Error loading contract, please try again or contact support');
				}
			});
		};
		// Tabs
		$scope.activeTab = "overview";
		$scope.setTab = function(value) {
			$scope.activeTab = value;
		}
		$scope.activeCatalogueTab = "releases";
		$scope.setCatalogueTab = function(value) {
			$scope.activeCatalogueTab = value;
		}
		// Terms
		$scope.addSalesRow = function() {
			$scope.contract.salesTerms.push({});
		}
		$scope.deleteSalesRow = function(sale) {
			var index = $scope.contract.salesTerms.indexOf(sale);
			$scope.contract.salesTerms.splice(index, 1);
		}
		$scope.addReturnsRow = function() {
			$scope.contract.returnsTerms.push({});
		}
		$scope.deleteReturnsRow = function(returnRow) {
			var index = $scope.contract.returnsTerms.indexOf(returnRow);
			$scope.contract.returnsTerms.splice(index, 1);
		}
		$scope.addCostsRow = function() {
			$scope.contract.costsTerms.push({});
		}
		$scope.deleteCostsRow = function(cost) {
			var index = $scope.contract.costsTerms.indexOf(cost);
			$scope.contract.costsTerms.splice(index, 1);
		}
		$scope.addMechanicalsRow = function() {
			$scope.contract.mechanicalTerms.push({});
		}
		$scope.deleteMechanicalsRow = function(mechanical) {
			var index = $scope.contract.mechanicalTerms.indexOf(mechanical);
			$scope.contract.mechanicalTerms.splice(index, 1);
		}
		$scope.addReservesRow = function() {
			$scope.contract.reserves.push({});
		}
		$scope.deleteReservesRow = function(reserve) {
			var index = $scope.contract.reserves.indexOf(reserve);
			$scope.contract.reserves.splice(index, 1);
		}
		$scope.save = function() {
			console.log($scope.contract);
			if(!$scope.contract._id) {
				Contract.create($scope.contract, function(response) {
					console.log(response);
					if(response.status == 200) {
						Notification.success('Contract successfully created');
						$window.location.href = "#/contracts/" + response.data._id + "/edit"
					} else {
						Notification.error('Error creating contract, please try again or contact support');
					}
				});
			} else {
				Contract.update($scope.contract._id, $scope.contract, function(response) {
					console.log(response);
					if(response.status == 200) {
						$scope.contract = response.data;
						Notification.success('Contract successfully saved');
					} else {
						Notification.error('Error saving contract, please try again or contact support');
					}
				});
			}
		};
		$scope.delete = function() {
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Contract.delete($scope.contract._id, function(response) {
					if(response.status == 200) {
						Notification.success('Contract successfully deleted');
						$window.location.href = "#/contracts"
					} else {
						Notification.error('Error deleting contract, please try again or contact support');
					}
				});
			});
		};
	}]);