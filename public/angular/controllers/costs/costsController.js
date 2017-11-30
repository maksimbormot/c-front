angular.module('Curve')
	.controller('costsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Cost', 'Notification', 'FileSaver', 'Loader', 'SelectAll',
		function($scope, $routeParams, Session, Pagination, Cost, Notification, FileSaver, Loader, SelectAll) {
		var controller = this;
		$scope.costs = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Loader.load();
			Cost.all(params, function(response) {
				if(response.status == 200) {
					$scope.costs = response.data.costs;
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
				Loader.success('Costs Successfully Searched');
			});
		};
		$scope.selectAll = function(e){
			SelectAll.select(e)
		}
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedCosts = [];
			$scope.costs.forEach(function(cost, callback){
				if (cost.selected){
					count++;
					selectedCosts.push(cost);
				}
			});
			if (count > 0){
				selectedCosts.forEach(function(cost){
					Cost.delete(cost._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.costs.indexOf(cost);
							$scope.costs.splice(index, 1);
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
					Loader.success(num + ' Costs successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one position');
			}
		}
		$scope.import = function() {
			Loader.load();
			Cost.import($scope.importFile, function(response) {
				if(response.status == 200) {
					$('#importModal').modal('hide');
					Loader.success('Costs successfully imported');
				} else if(response.status == 400) {
					$scope.importErrors = response.data.errors;
					Loader.complete();
				} else {
					Loader.complete();

				}
			});
		}
		$scope.export = function() {
			Loader.load();
			Cost.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Costs Export.xlsx";
					FileSaver.saveAs(file, name);
					Loader.complete();
				} else {
					console.error(result);
					Loader.error('Costs failed to export, please try again.');
				}
			});
		}
		// Load all contracts on page load
		this.filter({});
	}]);
