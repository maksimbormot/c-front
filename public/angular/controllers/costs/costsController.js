angular.module('Curve')
	.controller('costsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Contract', 'Notification', function($scope, $routeParams, Session, Pagination, Contract, Notification) {
		var controller = this;
		$scope.costs = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Contract.all(params, function(response) {
				if(response.status == 200) {
					$scope.contracts = response.data.contracts;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});
		};
		$scope.search = function(text) {
			controller.filter({ name: text }, function() {
				Notification.success('Contracts Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.contracts.forEach(function(contract, callback) {
				if(contract.selected) { 
					Contract.delete(contract._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.contracts.indexOf(contract);
							$scope.contracts.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Contracts successfully deleted');
			});
		}
		// Load all contracts on page load
		this.filter({});
	}]);