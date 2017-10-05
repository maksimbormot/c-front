angular.module('Curve')
  .controller('periodEditController', ['$scope', '$routeParams', '$window', 'Session', 'Period', 'Notification', 'Settings', 'Loader', 'Years',
    function($scope, $routeParams, $window, Session, Period, Notification, Settings, Loader, Years) {
      var controller = this;
      $scope.period = { salesFilesIds: [], costIds: [] };
      $scope.accountingPeriods = ["H1", "H2", "Q1", "Q2", "Q3", "Q4"];
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

      // Load Period if ID exists
      if($routeParams.id) {
        Loader.load();
        Period.get($routeParams.id, function(response) {
          if(response.status == 200) {
            $scope.period = response.data;
            console.log($scope.period);
            loadIncludeSalesFiles();
            loadIncludeCosts();
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

    }
  ]);
