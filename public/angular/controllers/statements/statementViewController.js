angular.module('Curve')
  .controller('statementViewController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Statement', 'Notification', 'Loader', 'Settings',
    function($scope, $routeParams, Session, Pagination, Statement, Notification, Loader, Settings) {
      var controller = this;
      $scope.salesFiles = [];
      $scope.costs = [];
      $scope.includeSalesFiles = [];
      $scope.includeCosts = [];

      // Load Period if ID exists
      if($routeParams.id) {
        Loader.load();
        Statement.get($routeParams.id, function(response) {
          if(response.status == 200) {
            console.log(response.data);
            $scope.statement = response.data;
            loadIncludeSalesFiles();
            loadIncludeCosts();
            init();
            Loader.complete();
          } else {
            Loader.error('Error loading statement, please try again or contact support');
          }
        });
      };

      function init() {
        Settings.getSalesFiles()
        .then(function(salesFiles) {
          $scope.salesFiles = salesFiles;
          loadIncludeSalesFiles();
        });
        Settings.getCosts()
          .then(function(costs) {
            $scope.costs = costs;
            loadIncludeCosts();
          });
  
      }
      
      function loadIncludeSalesFiles() {
        console.log($scope.salesFiles);
        if($scope.salesFiles.length && $scope.statement.salesFilesIds.length) {
          $scope.statement.salesFilesIds.forEach(function(salesId) {
            $scope.salesFiles.forEach(function(sale) {
              if(sale._id == salesId) {
                $scope.includeSalesFiles.push(sale);
              }
            });
          });
        }
      }

      function loadIncludeCosts() {
        if($scope.costs.length && $scope.statement.costIds.length) {
          $scope.statement.costIds.forEach(function(costId) {
            $scope.costs.forEach(function(cost) {
              if(cost._id == costId) {
                $scope.includeCosts.push(cost);
              }
            });
          });
        }
      }

      // Tabs
      $scope.activeTab = "overview";
      $scope.setTab = function(value) {
        $scope.activeTab = value;
      }

    }
  ]);
