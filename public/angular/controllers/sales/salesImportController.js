angular.module('Curve')
  .controller('salesImportController', ['$scope', '$routeParams', '$window', 'Session', 'Notification', 'Territories', 'Settings', 'Upload', 'SalesFile', 'Currencies', function($scope, $routeParams, $window, Session, Notification, Territories, Settings, Upload, SalesFile, Currencies) {
    var controller = this;
    $scope.token = '?applicationToken=12345&token=' + Session.token;
    $scope.salesImport = false;
    $scope.saleDatePopup = false;
    $scope.transactionDatePopup = false;
    $scope.territories = Territories;
    $scope.currencies = Currencies;
    $scope.types = ["Sale", "Return"];
    $scope.salesFile = { overwriteFields: {} };
    $scope.templates = [];
    $scope.selectedTemplate = { exampleLines: [] };
    $scope.data = [];
    $scope.array = [];

    // Load Template if ID exists
    if($routeParams.id) {
      SalesFile.get($routeParams.id, function(response) {
        if(response.status == 200) {
          $scope.salesFile = response.data;
          $scope.salesFile.overwriteFields.saleDate = new Date(response.data.overwriteFields.saleDate);
          $scope.salesFile.overwriteFields.transactionDate = new Date(response.data.overwriteFields.transactionDate);
        } else {
          Notification.error('Error loading template, please try again or contact support');
        }
      });
    };

    $scope.getSources = function() {
      $scope.sources = [];
      next:
        for(var i = 0; i < $scope.templates.length; i++) {
          var source = $scope.templates[i].source;
          for(var j = 0; j < $scope.sources.length; j++) {
            if($scope.sources[j].source == source) {
              continue next;
            }
          }
          $scope.sources.push($scope.templates[i]);
        }
      return $scope.sources;
    }

    Settings.getSettings()
      .then(function(settings) {
        angular.extend($scope, settings);
      });
    Settings.getTemplates()
      .then(function(templates) {
        $scope.templates = templates;
        $scope.getSources();
      });

    $scope.onSelectedTemplate = function(selectedItem) {
      console.log(selectedItem);
      $scope.salesFile.salesTemplateId = selectedItem._id;
      $scope.salesFile.overwriteFields = selectedItem.overwriteFields;
      $scope.salesFile.overwriteFields.saleDate = new Date(selectedItem.overwriteFields.saleDate);
      $scope.salesFile.overwriteFields.transactionDate = new Date(selectedItem.overwriteFields.transactionDate);
      $scope.templateId = selectedItem._id;
      for(var i = 0; i < $scope.templates.length; i++) {
        if($scope.templates[i]._id == $scope.templateId) {
          $scope.selectedTemplate = $scope.templates[i];
        }
      }
      return $scope.selectedTemplate;
    }

    $scope.groupFind = function(territory) {
      return territory.continent;
    }
    $scope.openSaleDatePopup = function() {
      $scope.saleDatePopup = true;
    }
    $scope.openTransactionDatePopup = function() {
      $scope.transactionDatePopup = true;
    }

    $scope.upload = function(file) {
      $scope.salesFile.status = 'Setup';
      // Ensure salesFile is created or saved here before upload
      save(function(response) {
        if(response.status == 200) {
          $scope.salesFile = response.data;
          Notification.success('Sale successfully saved');
          // After successful save, upload file with updated salesFile ID
          $scope.salesFile.exampleLines = [];
          $scope.salesImport = true;
          Upload.upload({
              url: 'http://localhost:8081/salesFiles/upload' + $scope.token,
              method: 'POST',
              data: {
                file: file,
                salesFile_id: $scope.salesFile._id
              }
            })
            .then(function(resp) {
              // This all needs moving to the backend
              $scope.salesFile.file = resp.data.url;
              $scope.data = resp.data.template;
              var headers = $scope.data.shift();
              console.log("Template Headers: ");
              console.log($scope.selectedTemplate.exampleLines[0]);
              $scope.salesFile.exampleLines[0] = $scope.selectedTemplate.exampleLines[0];

              for(var i = 0; i < ($scope.data.length > 10 ? 10 : $scope.data.length); i++) {
                var subArray = [];
                $scope.salesFile.exampleLines[0].forEach(function(element) {
                  var number = 0;
                  headers.forEach(function(el) {
                    if(element == el) {
                      number++;
                      $scope.index1 = headers.indexOf(el);
                    }
                  });
                  if(number == 0) {
                    $scope.index1 = -1;
                  }
                  var count = 0;
                  for(var j = 0; j < $scope.data[i].length; j++) {
                    if(j == $scope.index1) {
                      subArray.push($scope.data[i][j]);
                      count++;
                    }
                  }
                  if(count == 0) {
                    subArray.push('');
                  }
                });
                $scope.salesFile.exampleLines.push(subArray);
              }
              save(function() {
                return $scope.salesFile.exampleLines;
              });
            })
        } else {
          Notification.error('Error saving sales file, please try again or contact support');
        }
      });
    };

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
