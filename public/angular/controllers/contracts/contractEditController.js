angular.module('Curve')
	.controller('contractEditController', ['$scope', '$routeParams', '$window', 'Session', 'Contract', 'Parent', 'Territories', 'Settings', 'Notification', 'Loader',
		function($scope, $routeParams, $window, Session, Contract, Parent, Territories, Settings, Notification, Loader) {
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
			Loader.load();
			Contract.get($routeParams.id, function(response) {  
				if(response.status == 200) {
					console.log(response.data);
					$scope.contract = response.data;
					Loader.complete();
				} else {
					Loader.error('Error loading contract, please try again or contact support');
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
			Loader.load();
			if(!$scope.contract._id) {
				Contract.create($scope.contract, function(response) {
					console.log(response);
					if(response.status == 200) {
						$window.location.href = "#/contracts/" + response.data._id + "/edit";
						Loader.success('Contract successfully created');
					} else {
						Loader.error('Error creating contract, please try again or contact support');
					}
				})
				.catch(function(response){
					if(response.status == 400) {
						Loader.error('The object has not been saved.  ' + response.data.message);
					}
				});
			} else {
				Contract.update($scope.contract._id, $scope.contract, function(response) {
					console.log(response);
					if(response.status == 200) {
						$scope.contract = response.data;
						Loader.success('Contract successfully saved');
					} else {
						Loader.error('Error saving contract, please try again or contact support');
					}
				})
				.catch(function(response){
					if(response.status == 400) {
						Loader.error('The object has not been saved.  ' + response.data.message);
					}
				});
			}
		};
		$scope.delete = function() {
			Loader.load();
			$('#deleteModal').modal('hide');
			$('#deleteModal').on('hidden.bs.modal', function() {
				Contract.delete($scope.contract._id, function(response) {
					if(response.status == 200) {
						$window.location.href = "#/contracts";
						Loader.success('Contract successfully deleted');
					} else {
						Loader.error('Error deleting contract, please try again or contact support');
					}
				});
			});
		};
	}]);