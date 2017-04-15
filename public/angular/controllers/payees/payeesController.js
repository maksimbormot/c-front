angular.module('Curve')
	.controller('payeesController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Payee', 'Notification', function($scope, $routeParams, Session, Pagination, Payee, Notification) {
		var controller = this;
		$scope.payees = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Payee.all(params, function(response) {
				if(response.status == 200) {
					$scope.payees = response.data.payees;
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
				Notification.success('Payees Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.payees.forEach(function(payee, callback) {
				if(payee.selected) { 
					Payee.delete(payee._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.payees.indexOf(payee);
							$scope.payees.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Payees successfully deleted');
			});
		}
		// Load all payees on page load
		this.filter({});
	}]);