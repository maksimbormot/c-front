angular.module('Curve')
  .controller('statementViewController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Statement', 'Notification', 'Loader', 'Settings', 'OutputSales',
    function($scope, $routeParams, Session, Pagination, Statement, Notification, Loader, Settings, OutputSales) {
      var controller = this;
      $scope.salesFiles = [];
      $scope.costs = [];
      $scope.includeSalesFiles = [];
      $scope.includeCosts = [];
      $scope.filter = {};

      this.filterOutputSales = function(params, callback) {
        Loader.load();
        OutputSales.all(params, function(response) {
          if(response.status == 200) {
            $scope.outputSales = response.data.outputSales;
            $scope.totalPages = response.data.meta.totalPages;
            $scope.currentPage = response.data.meta.currentPage;
            $scope.total = response.data.meta.total;
            $scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
            if(callback) { callback(); }
            Loader.complete();
          } else {
            Loader.error(response.data.message);
          }
        });
      };

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
            $scope.filter.periodId = $scope.statement.periodId;
            $scope.filter.contractId = $scope.statement.contractId;
            controller.filterOutputSales($scope.filter);
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

      $scope.getSortedData = function(orderBy) {
        if($scope.orderBy == orderBy) {
          $scope.orderDir = ($scope.orderDir == 'asc') ? 'desc' : 'asc';
        }
        $scope.orderBy = orderBy;
        $scope.filter.orderBy = orderBy;
        $scope.filter.orderDir = $scope.orderDir;
        controller.filterOutputSales($scope.filter);
      };
      $scope.whatClassIsIt = function(field) {
        if($scope.orderBy == field) {
          if($scope.orderDir == 'asc') {
            return 'sorting_asc';
          } else {
            return 'sorting_desc';
          }
        } else {
          return 'sorting';
        }
      }
      $scope.search = function() {
        $scope.filter.periodId = $scope.statement.periodId;
        $scope.filter.contractId = $scope.statement.contractId;
        controller.filterOutputSales($scope.filter, function() {
          Loader.success('Sales Successfully Searched');
        });
      };
      
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
