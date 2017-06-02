angular.module('Curve')
	.controller('salesTemplatesController', ['$scope', '$routeParams', 'Session', 'Pagination', 'SalesTemplate', 'Notification', function($scope, $routeParams, Session, Pagination, SalesTemplate, Notification) {
		var controller = this;
		$scope.templates = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			SalesTemplate.all(params, function(response) {
				if(response.status == 200) {
					$scope.templates = response.data.templates;
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
				Notification.success('Templates Successfully Searched');
			});
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.templates.forEach(function(template, callback) {
				if(template.selected) { 
					SalesTemplate.delete(template._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.templates.indexOf(template);
							$scope.templates.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Templates successfully deleted');
			});
		}
		// Load all templates on page load
		this.filter({});
	}]);