angular.module('Curve')
	.controller('clientsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Client', 'Notification', function($scope, $routeParams, Session, Pagination, Client, Notification) {
		var controller = this;
		$scope.clients = [];
		$scope.searchText = null;
    	$scope.orderBy = 'name';
		$scope.orderDir = 'asc';
		this.filter = function(params, callback) {
			Client.all(params, function(response) {
				if(response.status == 200) {
					$scope.clients = response.data.clients;
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
		$scope.search = function(text) {
			controller.filter({ name: text }, function() {
				Notification.success('Clients Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.clients.forEach(function(client, callback) {
				if(client.selected) { 
					Client.delete(client._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.clients.indexOf(client);
							$scope.clients.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Clients successfully deleted');
			});
		}
		// Load all clients on page load
		this.filter({});
	}]);