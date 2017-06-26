angular.module('Curve')
	.controller('salesFileController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Notification', 'FileSaver', 'SalesFile', function($scope, $routeParams, Session, Pagination, Notification, FileSaver, SalesFile) {
		var controller = this;
		$scope.salesFile = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			SalesFile.all(params, function(response) {
				if(response.status == 200) {
					$scope.salesFile = response.data.salesFiles;
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
				Notification.success('Sales Successfully Searched');
			});
		};

		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};

		$scope.deleteSelected = function() {
			var num = 0
			$scope.salesFile.forEach(function(sale, callback) {
				if(sale.selected) { 
					SalesFile.delete(sale._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.salesFile.indexOf(sale);
							$scope.salesFile.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Sale successfully deleted');
			});
		}
		$scope.export = function() {
			SalesFile.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Sales Export.xlsx";
					FileSaver.saveAs(file, name);
				} else {
					console.error(result);
					Notification.error('Sales failed to export, please try again.');
				}
			});
		}
		// Load all contracts on page load
		this.filter({});
	}]);