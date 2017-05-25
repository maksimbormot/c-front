angular.module('Curve')
<<<<<<< HEAD
  .controller('campaignsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Campaign', 'Notification', 'FileSaver', function($scope, $routeParams, Session, Pagination, Campaign, Notification, FileSaver) {
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
    $scope.search = function() {
      controller.filter({ text: $scope.searchText }, function() {
        Notification.success('Campaigns Successfully Searched');
      });
    };
    $scope.changePage = function(page) {
      controller.filter({ text: $scope.searchText, page: page });
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
    $scope.import = function() {
      Campaign.import($scope.importFile, function(response) {
        if(response.status == 200) {
          $('#importModal').modal('hide');
          Notification.success('Campaigns successfully imported');
        } else if(response.status == 400) {
          $scope.importErrors = response.data.errors;
        } else {

        }
      });
    }
    $scope.export = function() {
      Campaign.export(function(result) {
        if(result && result.status == 200) {
          var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          var name = "Campaigns Export.xlsx";
          FileSaver.saveAs(file, name);
        } else {
          console.error(result);
          Notification.error('Campaigns failed to export, please try again.');
        }
      });
    }
    // Load all clients on page load
    this.filter({});
  }]);
=======
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
>>>>>>> 3671be94cac39f754bb5eb3c856b57ec7d772570