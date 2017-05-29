angular.module('Curve')
	.controller('releasesController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Release', 'Notification', 'FileSaver', function($scope, $routeParams, Session, Pagination, Release, Notification, FileSaver) {
		var controller = this;
		$scope.releases = [];
		$scope.searchText = null;
		$scope.orderBy = 'title';
		$scope.orderDir = 'asc';
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
				Notification.success('Releases Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ text: $scope.searchText, page: page });
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
		$scope.import = function() {
			Release.import($scope.importFile, function(response) {
				if(response.status == 200) {
					$('#importModal').modal('hide');
					Notification.success('Releases successfully imported');
				} else if(response.status == 400) {
					$scope.importErrors = response.data.errors;
				} else {

				}
			});
		}
		$scope.export = function() {
			Release.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Releases Export.xlsx";
					FileSaver.saveAs(file, name);
				} else {
					console.error(result);
					Notification.error('Releases failed to export, please try again.');
				}
			});
		}
		this.filter({});
	}]);