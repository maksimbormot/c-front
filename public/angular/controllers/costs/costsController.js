angular.module('Curve')
	.controller('costsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Cost', 'Notification', 'FileSaver', function($scope, $routeParams, Session, Pagination, Cost, Notification, FileSaver) {
		var controller = this;
		$scope.costs = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Cost.all(params, function(response) {
				if(response.status == 200) {
					$scope.costs = response.data.costs;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});   
		};
		$scope.getSortedData = function(orderBy) {
			if ( $scope.orderBy == orderBy ) {
				$scope.orderDir = ( $scope.orderDir == 'asc' ) ? 'desc' : 'asc';
			}
			$scope.orderBy = orderBy;
			controller.filter({ text: $scope.searchText, orderBy: $scope.orderBy, orderDir: $scope.orderDir });
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
				Notification.success('Costs Successfully Searched');
			});
		};

		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.costs.forEach(function(cost, callback) {
				if(cost.selected) { 
					Cost.delete(cost._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.costs.indexOf(cost);
							$scope.costs.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Costs successfully deleted');
			});
		}
		$scope.import = function() {
			Cost.import($scope.importFile, function(response) {
				if(response.status == 200) {
					$('#importModal').modal('hide');
					Notification.success('Costs successfully imported');
				} else if(response.status == 400) {
					$scope.importErrors = response.data.errors;
				} else { 

				}
			});
		}
		$scope.export = function() {
			Cost.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Costs Export.xlsx";
					FileSaver.saveAs(file, name);
				} else {
					console.error(result);
					Notification.error('Costs failed to export, please try again.');
				}
			});
		}
		// Load all contracts on page load
		this.filter({});
	}]);