angular.module('Curve')
	.controller('campaignsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Campaign', 'Notification', function($scope, $routeParams, Session, Pagination, Campaign, Notification) {
		var controller = this;
		$scope.campaigns = [];
		$scope.searchText = null;
		this.filter = function(params, callback) {
			Campaign.all(params, function(response) {
				if(response.status == 200) {
					$scope.campaigns = response.data.campaigns;
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
				Notification.success('Campaigns Successfully Searched');
			});
		};
		$scope.import = function() {
			console.log('campaign import!');
		};
		$scope.changePage = function(page) {
			controller.filter({ name: $scope.searchText, page: page });
		};
		$scope.deleteSelected = function() {
			var num = 0
			$scope.campaigns.forEach(function(campaign, callback) {
				if(campaign.selected) { 
					Campaign.delete(campaign._id, function(response) {
						if(response.status == 200) {
							num++;
							var index = $scope.campaigns.indexOf(campaign);
							$scope.campaigns.splice(index, 1);
							$('#deleteModal').modal('hide');
						}
					});
				}
			});
			$('#deleteModal').on('hidden.bs.modal', function() {
				Notification.success(num + ' Campaigns successfully deleted');
			});
		}
		// Load all clients on page load
		this.filter({});
	}]);