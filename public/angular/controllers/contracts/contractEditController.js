angular.module('Curve')
	.controller('contractEditController', ['$scope', '$routeParams', '$window', 'Session', 'Contract', 'Parent', 'Territories', 'Settings', 'Notification', function($scope, $routeParams, $window, Session, Contract, Parent, Territories, Settings, Notification) {
		var controller = this;
		$scope.contract = { salesTerms: [], returnsTerms: [], costsTerms: [], mechanicalTerms: [], reserves: [] };
		$scope.payees = [];
		$scope.accountingPeriods = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];
		$scope.contractTypes = ["Royalty", "Profit Share"];
		$scope.countries = Territories; 
		$scope.salesTypes = ["Gross Receipts","Net Receipts", "PPD"];
		$scope.costsTypes = ["Gross Receipts","Net Receipts", "PPD"];
		$scope.distributionChannels = [];
		$scope.configurations = []; 
		$scope.priceCategories = [];

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

		Settings.getSettings()
			.then(function(settings){
				angular.extend($scope, settings);
			});

		Settings.getPayees()
			.then(function(payees){
				$scope.payees = payees;
			});	

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