angular.module('Curve')
	.controller('salesTemplatesController', ['$scope', '$routeParams', 'Session', 'Pagination', 'SalesTemplate', 'Notification', 'Loader',
		function($scope, $routeParams, Session, Pagination, SalesTemplate, Notification, Loader) {
		var controller = this;
		$scope.salesTemplate = [];
		$scope.searchText = null; 
		this.filter = function(params, callback) {
			Loader.load();
			SalesTemplate.all(params, function(response) {
				if(response.status == 200) {
					$scope.salesTemplate = response.data.salesTemplates;
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
				Loader.success('Templates Successfully Searched');
			});
		};

		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		
		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedSalesTemplate = [];
			$scope.salesTemplate.forEach(function(template, callback){
				if (template.selected){
					count++;
					selectedSalesTemplate.push(template);
				}
			});
			if (count > 0){
				selectedSalesTemplate.forEach(function(template){
					SalesTemplate.delete(template._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.salesTemplate.indexOf(template);
							$scope.salesTemplate.splice(index, 1);
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
					Loader.success(num + ' Templates successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one position');
			}
		}
		// Load all templates on page load
		this.filter({});
	}]);