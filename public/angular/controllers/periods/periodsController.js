angular.module('Curve')
	.controller('periodsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Period', 'Notification', 'Loader',
		function($scope, $routeParams, Session, Pagination, Period, Notification, Loader) {
		var controller = this;
		$scope.periods = [];
		$scope.searchText = null;
		$scope.orderBy = 'name';
		$scope.orderDir = 'asc';
		this.filter = function(params, callback) { 
			Loader.load();
			Period.all(params, function(response) {
				if(response.status == 200) {
					$scope.periods = response.data.periods;
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
				Loader.success('Periods Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ text: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedPeriods = [];
			$scope.periods.forEach(function(period, callback){
				if (period.selected){
					count++;
					selectedPeriods.push(period);
				}
			});
			if (count > 0){
				selectedPeriods.forEach(function(period){
					Period.delete(period._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.periods.indexOf(period);
							$scope.periods.splice(index, 1);
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
					Loader.success(num + ' Periods successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one position');
			}
		}

		// Load all periods on page load
		this.filter({});
	}]);