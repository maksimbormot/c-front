angular.module('Curve')
  .controller('salesUnmappedController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Notification', 'Territories', 'Settings', 'Currencies', 'Sales', 'Loader',
    function($scope, $routeParams, Session, Pagination, Notification, Territories, Settings, Currencies, Sales, Loader) {
      var controller = this;
      $scope.saleDatePopup = false;
      $scope.transactionDatePopup = false;
      $scope.territories = Territories;
      $scope.currencies = Currencies;
      $scope.types = ["Sale", "Return"];
      $scope.filter = {};
      $scope.sales = [];
      $scope.searchText = null;
      $scope.filterSales = [];
      $scope.releases = [];
      $scope.tracks = [];
      $scope.works = [];

      this.filter = function(params, callback) {
        params.status = 'Incomplete';
        Loader.load();
        Sales.all(params, function(response) {
          if(response.status == 200) {
            $scope.sales = response.data.sales;
            if(response.data.meta && response.data.meta.totalPages) { $scope.totalPages = response.data.meta.totalPages; }
            if(response.data.meta && response.data.meta.currentPage) { $scope.currentPage = response.data.meta.currentPage; }
            if(response.data.meta && response.data.meta.currentPage && response.data.meta.totalPages) { $scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages); }
            $scope.total = $scope.sales.length;
            $scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages);
            if(callback) { callback(); }
            Loader.complete();
          } else {
            Loader.error(response.data.message);
          }
        });
      };
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
        controller.filter($scope.sales, function() {
          $scope.filterSales = $scope.sales;
          Loader.success('Sales Successfully Searched');
        });
      };
      $scope.changePage = function(page) {
        controller.filter({ name: $scope.sales, page: page });
      };

      Settings.getSettings()
        .then(function(settings) {
          angular.extend($scope, settings);
        });
      Settings.getReleases()
        .then(function(response) {
          $scope.releases = response.releases;
        });
      Settings.getTracks()
        .then(function(response) {
          $scope.tracks = response.tracks;
        });
      Settings.getWorks()
        .then(function(response) {
          $scope.works = response.works;
        });
      Settings.getSalesFiles()
        .then(function(response) {
          $scope.salesFiles = response.salesFiles;
        });

      $scope.groupFind = function(territory) {
        return territory.continent;
      }

      $scope.openSaleDatePopup = function() {
        $scope.saleDatePopup = true;
      }
      $scope.openTransactionDatePopup = function() {
        $scope.transactionDatePopup = true;
      }

      $scope.editSingle = function(sale) {
        $scope.editType = 'single';
        $scope.sale = sale;
      }
      $scope.editSelected = function() {
        $scope.editType = 'selected';
        $scope.sale = {};
      }
      $scope.editFiltered = function() {
        $scope.editType = 'filtered';
        $scope.sale = {};
      }

      $scope.updateSingle = function() {
        Loader.load();
        $('#modalEditFields').modal('hide');
        $('#modalEditFields').on('hidden.bs.modal', function() {
          Sales.update($scope.sale._id, $scope.sale, function(response) {
            if(response.status == 200) {
              $scope.sale = response.data;
              Loader.success('Sale successfully saved');
            } else {
              Loader.error('Error saving sale, please try again or contact support');
            }
          });
        });
      }

      $scope.updateSingle = function() {
        Loader.load();
        $('#modalEditFields').modal('hide');
        $('#modalEditFields').on('hidden.bs.modal', function() {
          Sales.update($scope.sale._id, $scope.sale, function(response) {
            if(response.status == 200) {
              Loader.success('Sales line successfully updated');
            } else {
              Loader.error('Error saving sales line, please try again or contact support');
            }
          });
        });
      }

      $scope.updateSelected = function() {
        Loader.load();
        var ids = $scope.sales.map(function(sale) {
          if(sale.selected) {
            return sale._id } }).filter(Boolean);
        Sales.updateMultipleIds(ids, $scope.sale, function(response) {
          if(response.status == 200) {
            $('#modalEditFields').modal('hide');
          } else {
            Loader.error('Error saving sales line, please try again or contact support');
          }
        });
        $('#modalEditFields').on('hidden.bs.modal', function() {
          Loader.success(ids.length + ' Sales successfully updated');
          controller.filter($scope.filter);
        });
      }

      $scope.updateFiltered = function() {
        Loader.load();
        Sales.updateFiltered($scope.filter, $scope.sale, function(response) {
          if(response.status == 200) {
            $('#modalEditFields').modal('hide');
          } else {
            Loader.error('Error saving sales line, please try again or contact support');
          }
        });
        $('#modalEditFields').on('hidden.bs.modal', function() {
          Loader.success('Filtered sales successfully updated');
          controller.filter($scope.filter);
        });
      }

      // Load all sales on page load
      this.filter({});
    }
  ]);
