angular.module('Curve')
  .controller('periodCompleteController', ['$scope', '$routeParams', '$window', 'Session', 'Pagination', 'Period', 'Notification', 'Settings', 'Sales', 'Loader', 'Statement',
    function($scope, $routeParams, $window, Session, Pagination, Period, Notification, Settings, Sales, Loader, Statement) {
      var controller = this;
      $scope.period = { salesFilesIds: [], costIds: [] };
      $scope.salesFiles = [];
      $scope.costs = [];
      $scope.includeSalesFiles = [];
      $scope.includeCosts = [];
      $scope.sales = [];
      $scope.statements = [];
      $scope.filter = {};

      this.filter = function(params, callback) {
        Loader.load();
        Sales.all(params, function(response) {
          if(response.status == 200) {
            $scope.sales = response.data.sales;
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
        Period.get($routeParams.id, function(response) {
          if(response.status == 200) {
            $scope.period = response.data;
            loadIncludeSalesFiles();
            loadIncludeCosts();
            loadStatements();
            Loader.complete();
          } else {
            Loader.error('Error loading period, please try again or contact support');
          }
        });
      };

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
      Settings.getStatements()
        .then(function(statements) {
          $scope.statements = statements;
        });

      $scope.getSortedData = function(orderBy) {
        if($scope.orderBy == orderBy) {
          $scope.orderDir = ($scope.orderDir == 'asc') ? 'desc' : 'asc';
        }
        $scope.orderBy = orderBy;
        controller.filter({ text: $scope.searchText, orderBy: $scope.orderBy, orderDir: $scope.orderDir });
        Loader.complete();
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
        $scope.filter.periodId = $scope.period._id;
        controller.filter($scope.filter, function() {
          Loader.success('Sales Successfully Searched');
        });
      };

      $scope.runCalculation = function() {
        Loader.load();
        Period.runCalculation($scope.period._id, function() {
          $window.location.href = "#/periods";
          Loader.success('Period sent for calculation');
        });
      }

      function loadIncludeSalesFiles() {
        if($scope.salesFiles.length && $scope.period.salesFilesIds.length) {
          $scope.period.salesFilesIds.forEach(function(salesId) {
            $scope.salesFiles.forEach(function(sale) {
              if(sale._id == salesId) {
                $scope.includeSalesFiles.push(sale);
              }
            });
          });
        }
      }

      function loadIncludeCosts() {
        if($scope.costs.length && $scope.period.costIds.length) {
          $scope.period.costIds.forEach(function(costId) {
            $scope.costs.forEach(function(cost) {
              if(cost._id == costId) {
                $scope.includeCosts.push(cost);
              }
            });
          });
        }
      }

      function loadStatements(){
        Statement.all({ periodId: $scope.period._id }, function(response) {
          $scope.statements = response.data.statements;
        });
      }

      // Tabs
      $scope.activeTab = "overview";
      $scope.setTab = function(value) {
        $scope.activeTab = value;
      }

      this.filter({});

    }
  ]);
