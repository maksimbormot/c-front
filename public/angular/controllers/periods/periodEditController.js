angular.module('Curve')
  .controller('periodEditController', ['$scope', '$routeParams', '$window', 'Session', 'Period', 'Notification', 'Settings', 'Loader',
    function($scope, $routeParams, $window, Session, Period, Notification, Settings, Loader) {
      var controller = this;
      $scope.period = { salesFilesIds: [], costIds: [] };
      $scope.accountingPeriods = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];
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
      $scope.step = 1;

      // Load Period if ID exists
      if($routeParams.id) {
        Loader.load();
        Period.get($routeParams.id, function(response) {
          if(response.status == 200) {
            $scope.period = response.data;
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

      $scope.showStep = function(i) {
        $scope.step = i;
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

      $scope.saveAndNextStep = function(i) {
        if(i > 4) {
          $scope.step = i;
        } else {
          Loader.load();
          $scope.period.salesFilesIds = $scope.includeSalesFiles.map(function(el) {
            return el._id;
          });
          $scope.period.costIds = $scope.includeCosts.map(function(el) {
            return el._id;
          });
          $scope.period.status = 'Processing';
          if(!$scope.period._id) {
            Period.create($scope.period, function(response) {
                if(response.status == 200) {
                  Loader.success('Period successfully created');
                  $scope.period = response.data;
                } else {
                  Loader.error('Error creating period, please try again or contact support');
                }
              })
              .catch(function(response) {
                Loader.error('The object has not been saved.  ' + response.data.message);
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
                Loader.error('The object has not been saved.  ' + response.data.message);
              });
          }
          $scope.step = i;
        }
      }
    }
  ]);
