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
      $scope.currentPage = 1;

      this.filter = function(params, callback) {
        Loader.load();
        Sales.all(params, function(response) {
          if(response.status == 200) {
            $scope.sales = response.data.sales;
            console.log(response.data.meta);
            if(response.data.meta && response.data.meta.totalPages) { $scope.totalPages = response.data.meta.totalPages; }
            if(response.data.meta && response.data.meta.currentPage) { $scope.currentPage = parseInt(response.data.meta.currentPage); }
            if(response.data.meta && response.data.meta.currentPage && response.data.meta.totalPages) { $scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages); }
            if(response.data.meta && response.data.meta.total) { $scope.total = response.data.meta.total; }
            if(response.data && response.data.meta) { $scope.pages = Pagination.createArray(response.data.meta.currentPage, response.data.meta.totalPages); }
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
            console.log(response.data);
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
        $scope.currentPage = page;
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
        // Copy object without reference - to allow for someone to hit cancel
        $scope.sale = $.extend(true, {}, sale);
      }
      $scope.editSelected = function() {
        $scope.editType = 'selected';
        $scope.sale = {};
      }
      $scope.editFiltered = function() {
        $scope.editType = 'filtered';
        $scope.sale = {};
      }
      $scope.setupDeleteSingle = function(sale) {
        $scope.deleteType = 'single';
        $scope.sale = sale;
      }

      $scope.updateSingle = function() {
        Loader.load();
        Sales.update($scope.sale._id, $scope.sale, function(response) {
          if(response.status == 200) {
            controller.filter($scope.filter, function() {
              $scope.filterSales = $scope.sales;
              Loader.success('Sales line successfully delete');
            });
          } else {
            Loader.error('Error saving sales line, please try again or contact support');
          }
        });
      }

      $scope.deleteSingle = function() {
        Loader.load();
        Sales.delete($scope.sale._id, function(response) {
          if(response.status == 200) {
            controller.filter($scope.filter, function() {
              $scope.filterSales = $scope.sales;
              Loader.success('Sales line successfully delete');
            });
          } else {
            Loader.error('Error deleting sales line, please try again or contact support');
          }
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
            controller.filter($scope.filter);
          } else {
            Loader.error('Error saving sales line, please try again or contact support');
          }
        });
        Loader.success(ids.length + ' Sales successfully updated');
      }

      $scope.updateFiltered = function() {
        Loader.load();
        Sales.updateFiltered($scope.filter, $scope.sale, function(response) {
          if(response.status == 200) {
            $('#modalEditFields').modal('hide');
            controller.filter($scope.filter);
          } else {
            Loader.error('Error saving sales line, please try again or contact support');
          }
        });
        Loader.success('Filtered sales successfully updated');
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

      $scope.revalidate = function() {
        Loader.load();
        SalesFile.revalidate($scope.salesFile._id, function(response) {
          if(response.status == 200) {
            $window.location.href = "#/sales";
            Loader.success('Sales file revalidation started');
          } else {
            Loader.error('Error kicking off revalidation, please try again or contact support');
          }
        });
      }

    }
  ]);
