angular.module('Curve')
	.controller('clientsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Client', 'Notification', 'Loader',
		function($scope, $routeParams, Session, Pagination, Client, Notification, Loader) {
		var controller = this;
		$scope.clients = [];
		$scope.searchText = null;
    	$scope.orderBy = 'name';
		$scope.orderDir = 'asc';
		this.filter = function(params, callback) {
			Loader.load();
			Client.all(params, function(response) {
				if(response.status == 200) {
					$scope.clients = response.data.clients;
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
		$scope.search = function(text) {
			controller.filter({ name: text }, function() {
				Loader.success('Clients Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			Loader.load();
			var num = 0, count = 0;
			var selectedClients = [];
			$scope.clients.forEach(function(client, callback){
				if (client.selected){
					count++;
					selectedClients.push(client);
				}
			});
			if (count > 0){
				selectedClients.forEach(function(client){
					Client.delete(client._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.clients.indexOf(client);
							$scope.clients.splice(index, 1);
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
					Loader.success(num + ' Clients successfully deleted');
				});
			} else {
				$('#deleteModal').modal('hide');
				Loader.error('Choose at least one position');
			}
		}
		// Load all clients on page load
		this.filter({});
	}]);