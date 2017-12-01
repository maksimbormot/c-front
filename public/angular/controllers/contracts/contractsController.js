angular.module('Curve')
	.controller('contractsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Contract', 'Notification', 'FileSaver', 'Loader',
		function($scope, $routeParams, Session, Pagination, Contract, Notification, FileSaver, Loader) {
		var controller = this;
		$scope.contracts = [];
		$scope.searchText = null; 
		$scope.orderBy = 'name';
		$scope.orderDir = 'asc';
		this.filter = function(params, callback) {
			Loader.load();
			Contract.all(params, function(response) {
				if(response.status == 200) {
					$scope.contracts = response.data.contracts;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
					Loader.complete();
				} else {
					Loader.error(response.data.message);
				}
			});
		};
		$scope.getSortedData = function(orderBy) {
			if ( $scope.orderBy == orderBy ) {
				$scope.orderDir = ( $scope.orderDir == 'asc' ) ? 'desc' : 'asc';
			}
			$scope.orderBy = orderBy;
			controller.filter({ text: $scope.searchText, orderBy: $scope.orderBy, orderDir: $scope.orderDir });
			Loader.complete();
		};
		$scope.whatClassIsIt= function(field){
			if ($scope.orderBy == field) {
				if ( $scope.orderDir == 'asc' ) {
					return 'sorting_asc';
				} else {
					return 'sorting_desc';
				}
			} else {
				return 'sorting';
			}
		}
		$scope.search = function() {
			controller.filter({ text: $scope.searchText }, function() {
				Loader.success('Contracts Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ text: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedContracts = [];
			$scope.contracts.forEach(function(contract, callback){
				if (contract.selected){
					count++;
					selectedContracts.push(contract);
				}
			});
			if (count > 0){
				selectedContracts.forEach(function(contract){
					Contract.delete(contract._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.contracts.indexOf(contract);
							$scope.contracts.splice(index, 1);
							if (count === num) {
								$('#deleteModal').modal('hide');
								Loader.complete();
							}
						}
					})
					.catch(function(response){
						Loader.error('The object has not been deleted.  ' + response.data.message);
					});
				});
				$('#deleteModal').one('hidden.bs.modal', function() {
					Loader.success(num + ' Contracts successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one position');
			}
		}
		$scope.import = function() {
			Loader.load();
			Contract.import($scope.importFile, function(response) {
				if(response.status == 200) {
					$('#importModal').modal('hide');
					Loader.success('Contracts successfully imported');
				} else if(response.status == 400) {
					$scope.importErrors = response.data.errors;
					Loader.complete();
				} else {
					this.filter({});
				}
			});
		}
		$scope.export = function() {
			Loader.load();
			Contract.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Contracts Export.xlsx";
					FileSaver.saveAs(file, name);
					Loader.complete();
				} else {
					console.error(result);
					Loader.error('Contracts failed to export, please try again.');
				}
			});
		}
		// Load all contracts on page load
		this.filter({});
	}]);