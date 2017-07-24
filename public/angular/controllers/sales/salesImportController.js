angular.module('Curve')
  .controller('salesImportController', ['$scope', '$routeParams', '$window', 'Session', 'Notification', 'Territories', 'Settings', 'Upload', 'SalesFile', 'Currencies', function($scope, $routeParams, $window, Session, Notification, Territories, Settings, Upload, SalesFile, Currencies) {
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
      SalesFile.get($routeParams.id, function(response) {
        if(response.status == 200) {
          $scope.salesFile = response.data;
          if($scope.salesFile.overwriteFields && $scope.salesFile.overwriteFields.salesDate) { $scope.salesFile.overwriteFields.saleDate = new Date(response.data.overwriteFields.saleDate); }
          if($scope.salesFile.overwriteFields && $scope.salesFile.overwriteFields.transactionDate) { $scope.salesFile.overwriteFields.transactionDate = new Date(response.data.overwriteFields.transactionDate); }
          setupExampleTableHeaders();
          setupExampleTableBody();
        } else {
          Notification.error('Error loading template, please try again or contact support');
        }
      });
    };

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
      save(function(response) {
        Notification.success('Sales File successfully saved');
      });
    }

    $scope.delete = function() {
      $('#deleteModal').modal('hide');
      $('#deleteModal').on('hidden.bs.modal', function() {
        SalesFile.delete($scope.salesFile._id, function(response) {
          if(response.status == 200) {
            Notification.success('Sales File successfully deleted');
            $window.location.href = "#/sales"
          } else {
            Notification.error('Error deleting client, please try again or contact support');
          }
        });
      });
    }

    $scope.ingest = function() {
    	// Added save here
      save(function() {
      	SalesFile.ingest($scope.salesFile._id, {}, function(response) {
	        if(response.status == 200) {
	          $window.location.href = "#/sales"
	          Notification.success('Sales file ingestion started');
	        } else {
	          Notification.error('Error kicking off ingestion, please try again or contact support');
	        }
	      });
      });
    };

    function save(callback) {
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

  }]);
