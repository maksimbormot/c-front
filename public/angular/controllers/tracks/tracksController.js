angular.module('Curve')
	.controller('tracksController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Track', 'Notification', function($scope, $routeParams, Session, Pagination, Track, Notification) {
		var controller = this;
		$scope.tracks = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Track.all(params, function(response) {
				if(response.status == 200) {
					$scope.tracks = response.data.tracks;
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
				Notification.success('Tracks Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.tracks.forEach(function(track, callback) {
				if(track.selected) { 
					Track.delete(track._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.tracks.indexOf(track);
							$scope.tracks.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Tracks successfully deleted');
			});
		}
		this.filter({});
	}]);