angular.module('Curve')
	.controller('releasesController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Release', 'Notification', function($scope, $routeParams, Session, Pagination, Release, Notification) {
		var controller = this;
		$scope.releases = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Release.all(params, function(response) {
				if(response.status == 200) {
					$scope.releases = response.data.releases;
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
				Notification.success('Releases Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.releases.forEach(function(release, callback) {
				if(release.selected) { 
					Release.delete(release._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.releases.indexOf(release);
							$scope.releases.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Releases successfully deleted');
			});
		}
		this.filter({});
	}]);