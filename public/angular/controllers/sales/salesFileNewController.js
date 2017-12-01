angular.module('Curve')
  .controller('salesFileNewController', ['$scope', '$routeParams', '$window', 'Session', 'Notification', 'Territories', 'Settings', 'Upload', 'SalesFile', 'Currencies', 'Loader',
    function($scope, $routeParams, $window, Session, Notification, Territories, Settings, Upload, SalesFile, Currencies, Loader) {
    var controller = this;
    $scope.token = '?applicationToken=12345&token=' + Session.token;
    $scope.salesFile = { overwriteFields: {} };
    $scope.templates = [];
    $scope.selectedTemplate = { exampleLines: [] };
    $scope.data = [];
    $scope.array = [];

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

    $scope.create = function(file) {
      Loader.load();
      $scope.salesFile.status = 'Setup';
      // Ensure salesFile is created or saved here before upload
      save(function(response) {
        if(response.status == 200) {
          $scope.salesFile = response.data;
          Upload.upload({
              url: Session.apiUrl + '/salesFiles/' + $scope.salesFile._id + '/upload' + $scope.token,
              method: 'POST',
              data: {
                file: file,
                salesFile_id: $scope.salesFile._id
              }
            })
            .then(function(resp) {
              $window.location.href = "#/sales/" + $scope.salesFile._id + "/edit";
              Loader.success('Sales File successfully created');
            })
        } else {
          Loader.error('Error saving sales file, please try again or contact support');
        }
      });
    };

    function save(callback) {
      SalesFile.create($scope.salesFile, function(response) {
        callback(response);
      });
    }

  }]);
