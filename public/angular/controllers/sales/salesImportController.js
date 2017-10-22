angular.module('Curve')
  .controller('salesImportController', ['$scope', '$routeParams', '$window', 'Session', 'Notification', 'Territories', 'Settings', 'Upload', 'SalesFile', 'SalesTemplate', 'Currencies', 'Loader',
    function($scope, $routeParams, $window, Session, Notification, Territories, Settings, Upload, SalesFile, SalesTemplate, Currencies, Loader) {
    var controller = this;
    $scope.token = '?applicationToken=12345&token=' + Session.token;
    $scope.salesImport = false;
    $scope.saleDatePopup = false;
    $scope.transactionDatePopup = false;
    $scope.territories = Territories;
    $scope.currencies = Currencies;
    $scope.salesFile = { overwriteFields: {} };
    $scope.data = [];
    $scope.array = [];
    $scope.exampleTableHeaders = [];
    $scope.exampleTableBody = [];
    //$scope.salesColumnName = salesColumnName;

    // Load Template if ID exists
    if($routeParams.id) {
      Loader.load();
      init(function() {
        Loader.complete();
      });
    };

    function init(callback) {
      if($routeParams.id) {
        SalesFile.get($routeParams.id, function(response) {
          if(response.status == 200) {
            $scope.salesFile = response.data;
            console.log($scope.salesFile);
            if($scope.salesFile.overwriteFields && $scope.salesFile.overwriteFields.saleDate) { $scope.salesFile.overwriteFields.saleDate = new Date(response.data.overwriteFields.saleDate); }
            if($scope.salesFile.overwriteFields && $scope.salesFile.overwriteFields.transactionDate) { $scope.salesFile.overwriteFields.transactionDate = new Date(response.data.overwriteFields.transactionDate); }
            setupExampleTableHeaders();
            setupExampleTableBody();
            SalesTemplate.get($scope.salesFile.salesTemplateId, function(response) { 
              if(response.status == 200) {
                $scope.salesTemplate = response.data;
              }
            });
            if($scope.salesFile.status === 'Ingesting') { setTimeout(init, 10000); }
            if(callback) { callback(); }
          } else {
            if(callback) { callback(); }
            Loader.error('Error loading template, please try again or contact support');
          }
        });
      }
    }

    Settings.getSettings()
      .then(function(settings) {
        angular.extend($scope, settings);
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
    
    function setupExampleTableHeaders() {
      $scope.exampleTableHeaders = $scope.salesFile.exampleLines.splice(0, 1);
    }

    function setupExampleTableBody() {
      $scope.exampleTableBody = $scope.salesFile.exampleLines.splice(2, 12); 
    }

    $scope.save = function() {
      Loader.load();
      save(function(response) {
        Loader.success('Sales File successfully saved');
      });
    }

    $scope.delete = function() {
      $('#deleteModal').modal('hide');
      $('#deleteModal').on('hidden.bs.modal', function() {
        SalesFile.delete($scope.salesFile._id, function(response) {
          if(response.status == 200) {
            Loader.success('Sales File successfully deleted');
            $window.location.href = "#/sales"
          } else {
            Loader.error('Error deleting client, please try again or contact support');
          }
        });
      });
    }

    $scope.ingest = function() {
      Loader.load();
      save(function() {
      	SalesFile.ingest($scope.salesFile._id, {}, function(response) {
	        if(response.status == 200) {
	          $window.location.href = "#/sales";
	          Loader.success('Sales file ingestion started');
	        } else {
	          Loader.error('Error kicking off ingestion, please try again or contact support');
	        }
	      });
      });
    };

    function save(callback) {
      Loader.load();
      if(!$scope.salesFile._id) {
        SalesFile.create($scope.salesFile, function(response) {
          callback(response);
        });
      } else {
        SalesFile.update($scope.salesFile._id, $scope.salesFile, function(response) {
          callback(response);
        });
      }
    }

    // Required Fields
    $scope.includesTerritory = false;
    $scope.includesDistributionChannel = false;
    $scope.includesConfiguration = false;
    $scope.includesPriceCategory = false;
    $scope.includesCurrency = false;
    $scope.includesExchangeRate = false;
    $scope.includesSource = false;
    $scope.includesUnits = false;
    $scope.includesNetAmount = false;

    function updateIncludesFields() {
      $scope.includesTerritory = valueOrFalse($scope.salesFile.overwriteFields.originalTerritory, "originalTerritory");
      $scope.includesDistributionChannel = valueOrFalse($scope.salesFile.overwriteFields.originalDistributionChannel, "originalDistributionChannel");
      $scope.includesConfiguration = valueOrFalse($scope.salesFile.overwriteFields.originalConfiguration, "originalConfiguration");
      $scope.includesPriceCategory = valueOrFalse($scope.salesFile.overwriteFields.originalPriceCategory, "originalPriceCategory");
      $scope.includesCurrency = valueOrFalse($scope.salesFile.overwriteFields.originalCurrency, "originalCurrency");
      $scope.includesSource = valueOrFalse($scope.salesFile.overwriteFields.source, "source");
      $scope.includesExchangeRate = valueOrFalse($scope.salesFile.overwriteFields.exchangeRate, "exchangeRate");
      $scope.includesUnits = valueOrFalse($scope.salesFile.overwriteFields.units, "units");
      $scope.includesNetAmount = valueOrFalse($scope.salesFile.overwriteFields.netAmount, "netAmount");
    }

    function valueOrFalse(value, field) {
      if($scope.salesTemplate) {
        var fields = $scope.salesTemplate.fields.map(function(val) { return val.field });
        if(field && fields.indexOf(field) != -1) {
          return true;
        } else if(value) {
          return true;
        } else {
          return false;
        }
      }
    }

    $scope.$watch('salesTemplate.overwriteFields', updateIncludesFields, true);
    $scope.$watch('salesTemplate.fields', updateIncludesFields, true);

  }]);
