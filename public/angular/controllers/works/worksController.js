angular.module('Curve')
	.controller('worksController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Work', 'Notification', function($scope, $routeParams, Session, Pagination, Work, Notification) {
		var controller = this;
		$scope.works = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			console.log($scope.works);
			Work.all(params, function(response) {
				if(response.status == 200) {
					$scope.works = response.data.works;
					$scope.totalPages = response.data.meta.totalPages;
					$scope.currentPage = response.data.meta.currentPage;
					$scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
					if(callback) { callback(); }
				} else {
					Notification.error(response.data.message);
				}
			});
		};
		$scope.search = function() {
			controller.filter({ text: $scope.searchText }, function() {
				Notification.success('Works Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ text: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.works.forEach(function(work, callback) {
				if(work.selected) { 
					Work.delete(work._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.works.indexOf(work);
							$scope.works.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Works successfully deleted');
			});
		}
		// Load all clients on page load
		this.filter({});
	}]);