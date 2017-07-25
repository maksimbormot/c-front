angular.module('Curve')
  .controller('campaignsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Campaign', 'Notification', 'FileSaver', 'Loader',
    function($scope, $routeParams, Session, Pagination, Campaign, Notification, FileSaver, Loader) {
    var controller = this;
    $scope.campaigns = [];
    $scope.searchText = null;
    $scope.orderBy = 'title';
		$scope.orderDir = 'asc';  
    this.filter = function(params, callback) {
      Loader.load();
      Campaign.all(params, function(response) {
        if(response.status == 200) {
          $scope.campaigns = response.data.campaigns;
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
        Loader.success('Campaigns Successfully Searched');
      });
    };
    $scope.changePage = function(page) {
      controller.filter({ text: $scope.searchText, page: page });
    };
    $scope.deleteSelected = function() {
      Loader.load();
      var num = 0, count = 0;
      var selectedCampaigns = [];
      $scope.campaigns.forEach(function(campaign, callback){
        if (campaign.selected){
          count++;
          selectedCampaigns.push(campaign);
        }
      });
      if (count > 0){
        selectedCampaigns.forEach(function(campaign){
          Campaign.delete(campaign._id, function(response) {
            if(response.status == 200) {
              num++;
              var index = $scope.campaigns.indexOf(campaign);
              $scope.campaigns.splice(index, 1);
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
          Loader.success(num + ' Campaigns successfully deleted');
        });
      } else {
        $('#deleteModal').modal('hide');
        Loader.error('Choose at least one position');
      }
    }
    $scope.import = function() {
      Loader.load();
      Campaign.import($scope.importFile, function(response) {
        if(response.status == 200) {
          $('#importModal').modal('hide');
          Loader.success('Campaigns successfully imported');
        } else if(response.status == 400) {
          console.log(response.data.errors);
          $scope.importErrors = response.data.errors;
          Loader.complete();
        } else {
          Loader.complete();
        }
      });
    }
    $scope.export = function() {
      Loader.load();
      Campaign.export(function(result) {
        if(result && result.status == 200) {
          var file = new Blob([result.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          var name = "Campaigns Export.xlsx";
          FileSaver.saveAs(file, name);
          Loader.complete();
        } else {
          console.error(result);
          Loader.error('Campaigns failed to export, please try again.');
        }
      });
    }
    // Load all clients on page load
    this.filter({});
  }]);
