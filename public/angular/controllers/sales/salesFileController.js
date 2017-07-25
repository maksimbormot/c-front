angular.module('Curve')
	.controller('salesFileController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Notification', 'FileSaver', 'SalesFile', 'Loader',
		function($scope, $routeParams, Session, Pagination, Notification, FileSaver, SalesFile, Loader) {
		var controller = this;
		$scope.salesFile = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Loader.load();
			SalesFile.all(params, function(response) {
				if(response.status == 200) {
					$scope.salesFile = response.data.salesFiles;
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
				Loader.success('Sales Successfully Searched');
			});
		};

		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedSalesFile = [];
			$scope.salesFile.forEach(function(sale, callback){
				if (sale.selected){
					count++;
					selectedSalesFile.push(sale);
				}
			});
			if (count > 0){
				selectedSalesFile.forEach(function(sale){
					SalesFile.delete(sale._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.salesFile.indexOf(sale);
							$scope.salesFile.splice(index, 1);
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
					Loader.success(num + ' Sales successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one position');
			}
		}
		$scope.export = function() {
			Loader.load();
			SalesFile.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Sales Export.xlsx";
					FileSaver.saveAs(file, name);
					Loader.complete();
				} else {
					console.error(result);
					Loader.error('Sales failed to export, please try again.');
				}
			});
		}
		// Load all contracts on page load
		this.filter({});
	}]);