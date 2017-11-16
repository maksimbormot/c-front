angular.module('Curve')
  .controller('periodEditController', ['$scope', '$routeParams', '$window', 'Session', 'Period', 'Notification', 'Settings', 'Loader', 'Years',
    function($scope, $routeParams, $window, Session, Period, Notification, Settings, Loader, Years) {
      var controller = this;
      $scope.period = { salesFilesIds: [], costIds: [] };
      $scope.accountingPeriods = ["H1", "H2", "Q1", "Q2", "Q3", "Q4", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10", "M11", "M12"];
      $scope.years = Years;
      $scope.salesFiles = [];
      $scope.costs = [];
      $scope.includeSalesFiles = [];
      $scope.includeCosts = [];
      $scope.releasesWithoutContracts = [];
      $scope.releasesTotal = 0;
      $scope.tracksWithoutContracts = [];
      $scope.tracksTotal = 0;
      $scope.worksWithoutContracts = [];
      $scope.worksTotal = 0;
      $scope.incompleteContracts = [];
      $scope.contractsTotal = 0;
      $scope.statements = [];
      $scope.statementsTotal = 0;
      $scope.processingStatuses = ["Clearing Previous Data", "Updating Catalogue Data", "Calculating Sales", "Calculating Costs", "Creating Period Sales CSV", "Creating Period Costs CSV", "Setting Period Headline Data", "Creating Statements", "Setting Statement Headline Data", "Setting Contract Data to Sales", "Creating Statement CSVs", "Setting Period Analysis Data", "Setting Statement Analysis Data", "Creating Statement PDFs"];
      $scope.processingErrorStatuses = ["Errored in Clearing Previous Data", "Sales Calculation Errored", "Costs Calculation Errored", "Sales CSV Creation Errored", "Costs CSV Creation Errored", "Getting Headline Data Errored", "Creating Statements Errored", "Getting Statement Figures Errored", "Setting Contract Values Errored", "Getting Statement CSVs Errored", "Getting Period Analysis Data Errored", "Getting Statement Analysis Data Errored", "Creating Statement PDFs Errored"];
      $scope.currentStatusIndex = 0;

      // Load Period if ID exists
      if($routeParams.id) {
        Loader.load();
        init();
      }

      function init() {
        if($routeParams.id) {
          Period.get($routeParams.id, function(response) {
            if(response.status == 200 && response.data.status == "Complete") {
              $window.location.href = "#/periods/" + $routeParams.id + "/complete"
            } else if(response.status == 200) {
              $scope.period = response.data;
              console.log($scope.period);
              loadIncludeSalesFiles();
              loadIncludeCosts();
              if(response.data.startDate) { $scope.period.startDate = new Date(response.data.startDate); }
              if(response.data.endDate) { $scope.period.endDate = new Date(response.data.endDate); }
              if(response.data.accountingDate) { $scope.period.accountingDate = new Date(response.data.accountingDate); }
              Loader.complete();
              if($scope.period.status === 'Processing') { setTimeout(init, 1000); }
            } else {
              Loader.error('Error loading period, please try again or contact support');
            }
          });
        };
      }

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
      Settings.getReleases()
        .then(function(releases) {
          $scope.releasesWithoutContracts = releases.releases;
          $scope.releasesTotal = releases.meta.total;
        });
      Settings.getTracks()
        .then(function(tracks) {
          $scope.tracksWithoutContracts = tracks.tracks;
          $scope.tracksTotal = tracks.meta.total;
        });
      Settings.getWorks()
        .then(function(works) {
          $scope.worksWithoutContracts = works.works;
          $scope.worksTotal = works.meta.total;
        });
      Settings.getContracts()
        .then(function(contracts) {
          $scope.incompleteContracts = contracts.contracts;
          $scope.contractsTotal = contracts.meta.total;
        });
      Settings.getStatements()
        .then(function(statements) {
          $scope.statements = statements;
        });

      $scope.changePage = function(page) {
        $scope.period.setupStage = page;
        save();
      }

      $scope.deleteSelected = function() {
        Loader.load();
        var num = 0,
          count = 0;
        var selectedCosts = [];
        $scope.costs.forEach(function(cost, callback) {
          if(cost.selected) {
            count++;
            selectedCosts.push(cost);
          }
        });
        if(count > 0) {
          selectedCosts.forEach(function(cost) {
            Cost.delete(cost._id, function(response) {
                if(response.status == 200) {
                  num++;
                  var index = $scope.costs.indexOf(cost);
                  $scope.costs.splice(index, 1);
                  if(count === num) {
                    $('#deleteModal').modal('hide');
                    Loader.complete();
                  }
                }
              })
              .catch(function(response) {
                Loader.error('The object has not been deleted.  ' + response.data.message);
              });
          });
          $('#deleteModal').one('hidden.bs.modal', function() {
            Loader.success(num + ' Costs successfully deleted');
          });
        } else {
          $('#deleteModal').modal('hide');
          Loader.error('Choose at least one position');
        }
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

      function save() {
        if(!$scope.period._id) {
          $scope.period.status = "Setup";
          Period.create($scope.period, function(response) {
              if(response.status == 200) {
                $window.location.href = "#/periods/" + response.data._id + "/edit";
                Loader.success('Period successfully created');
              } else {
                Loader.error('Error creating period, please try again or contact support');
              }
            })
            .catch(function(response) {
              Loader.error('The period has not been saved.  ' + response.data.message);
            });
        } else {
          Period.update($scope.period._id, $scope.period, function(response) {
              console.log(response);
              if(response.status == 200) {
                $scope.period = response.data;
                Loader.success('Period successfully saved');
              } else {
                Loader.error('Error saving period, please try again or contact support');
              }
            })
            .catch(function(response) {
              Loader.error('The period has not been saved.  ' + response.data.message);
            });
        }
      }

      $scope.runCalculation = function() {
        Loader.load();
        Period.runCalculation($scope.period._id, function() {
          $window.location.href = "#/periods";
          Loader.success('Period sent for calculation');
        });
      }

      // Set Loading Indexes
      $scope.$watch('period.calculationStatus', function(status) {
        $scope.currentStatusIndex = $scope.processingStatuses.indexOf(status);
        $scope.erroredStatusIndex = $scope.processingErrorStatuses.indexOf(status);
      });

    }
  ]);
