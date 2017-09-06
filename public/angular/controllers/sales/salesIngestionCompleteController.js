angular.module('Curve')
  .controller('salesIngestionCompleteController', ['$scope', '$routeParams', '$window', 'Session', 'Pagination', 'Notification', 'Territories', 'Currencies', 'Settings', 'SalesFile', 'Sales', 'Loader',
    function($scope, $routeParams, $window, Session, Pagination, Notification, Territories, Currencies, Settings, SalesFile, Sales, Loader) {
      var controller = this;
      $scope.saleDatePopup = false;
      $scope.transactionDatePopup = false;
      $scope.territories = Territories;
      $scope.currencies = Currencies;
      $scope.catTypes = ["Release", "Track", "Work"];
      $scope.status = ["Complete", "Incomplete"];
      $scope.filter = {};
      $scope.sales = [];
      $scope.sale = {};
      $scope.searchText = null;
      $scope.filterSales = [];
      $scope.releases = [];
      $scope.tracks = [];
      $scope.works = [];

      this.filter = function(params, callback) {
        Loader.load();
        Sales.all(params, function(response) {
          if(response.status == 200) {
            $scope.sales = response.data.sales;
            if(response.data.meta && response.data.meta.totalPages) { $scope.totalPages = response.data.meta.totalPages; }
            if(response.data.meta && response.data.meta.currentPage) { $scope.currentPage = response.data.meta.currentPage; }
            if(response.data.meta && response.data.meta.currentPage && response.data.meta.totalPages) { $scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages); }
            if(response.data.meta && response.data.meta.total) { $scope.total = response.data.meta.total; }
            if(response.data && response.data.meta) { $scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages); }
            $scope.total = $scope.sales.length;
            if(callback) { callback(); }
            Loader.complete();
          } else {
            Loader.error(response.data.message);
          }
        });
      };

      // Load Template if ID exists
      if($routeParams.id) {
        Loader.load();
        SalesFile.get($routeParams.id, function(response) {
          if(response.status == 200) {
            $scope.salesFile = response.data;
            // Load all sales on page load
            $scope.filter = { salesFileId: $scope.salesFile._id };
            controller.filter($scope.filter);
          } else {
            Loader.error('Error loading template, please try again or contact support');
          }
        });
      };

      // Return to previous state
      $scope.edit = function() {
        Loader.load();
        $scope.salesFile.status = "Setup";
        console.log($scope.salesFile);
        SalesFile.update($scope.salesFile._id, $scope.salesFile, function(response) {
          $window.location.href = "#/sales/" + $scope.salesFile._id + "/edit";
        });
      }

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
        $scope.filter.salesFileId = $scope.salesFile._id;
        controller.filter($scope.filter, function() {
          $scope.filterSales = $scope.sales;
          Loader.success('Sales Successfully Searched');
        });
      };
      $scope.changePage = function(page) {
        $scope.filter.page = page;
        controller.filter($scope.filter);
      };

      Settings.getSettings()
        .then(function(settings) {
          angular.extend($scope, settings);
        });
      Settings.getReleases()
        .then(function(releases) {
          $scope.releases = releases.releases;
        });
      Settings.getTracks()
        .then(function(tracks) {
          $scope.tracks = tracks.tracks;
        });
      Settings.getWorks()
        .then(function(works) {
          $scope.works = works.works;
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

      $scope.reingest = function() {
        Loader.load();
        SalesFile.ingest($scope.salesFile._id, {}, function(response) {
          if(response.status == 200) {
            $window.location.href = "#/sales";
            Loader.success('Sales file ingestion started');
          } else {
            Loader.error('Error kicking off ingestion, please try again or contact support');
          }
        });
      };

    }
  ]);
