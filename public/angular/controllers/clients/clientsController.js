angular.module('Curve')
	.controller('clientsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Client', 'Notification', function($scope, $routeParams, Session, Pagination, Client, Notification) {
		var controller = this;
		$scope.clients = [];
		$scope.searchText = null;
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
		$scope.search = function(text) {
			controller.filter({ name: text }, function() {
				Notification.success('Clients Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			$scope.clients.forEach(function(client, callback) {
				if(client.selected) { 
					Client.delete(client._id, function(response) {
						if(response.status == 200) {
							Notification.success('Client ' + client.name + ' Successfully Deleted');
							var index = $scope.clients.indexOf(client);
							$scope.clients.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
		}
		// Load all clients on page load
		this.filter({});
	}]);