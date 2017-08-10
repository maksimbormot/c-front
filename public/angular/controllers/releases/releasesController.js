angular.module('Curve')
	.controller('releasesController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Release', 'Notification', 'FileSaver', 'Loader',
		function($scope, $routeParams, Session, Pagination, Release, Notification, FileSaver, Loader) {
		var controller = this;
		$scope.releases = []; 
		$scope.searchText = null;
		$scope.orderBy = 'title';
		$scope.orderDir = 'asc';
		this.filter = function(params, callback) {
			Loader.load();
			Release.all(params, function(response) {
				if(response.status == 200) {
					$scope.releases = response.data.releases;
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
				Loader.success('Releases Successfully Searched');
			});
		};  
		$scope.changePage = function(page) {
			controller.filter({ text: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedReleases = [];
			$scope.releases.forEach(function(release, callback){
				if (release.selected){
					count++;
					selectedReleases.push(release);
				}
			});
			if (count > 0){
				selectedReleases.forEach(function(release){
					Release.delete(release._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.releases.indexOf(release);
							$scope.releases.splice(index, 1);
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
				$('#deleteModal').on('hidden.bs.modal', function() {
					Loader.success(num + ' Releases successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one release');
			}
		}
		$scope.import = function() {
			Loader.load();
			Release.import($scope.importFile, function(response) {
				if(response.status == 200) {
					$('#importModal').modal('hide');
					Loader.success('Releases successfully imported');
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
			Release.export(function(result) {
				if(result && result.status == 200) {
					var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
					var name = "Releases Export.xlsx";
					FileSaver.saveAs(file, name);
					Loader.complete();
				} else {
					console.error(result);
					Loader.error('Releases failed to export, please try again.');
				}
			});
		}
		this.filter({});
	}]);