angular.module('Curve')
  .controller('statementsController', ['$scope', '$routeParams', 'Session', 'Pagination', 'Statement', 'Notification', 'Loader',
    function($scope, $routeParams, Session, Pagination, Statement, Notification, Loader) {
      var controller = this;

      $scope.statements = [];
      $scope.searchText = null;
      $scope.orderBy = 'name';
      $scope.orderDir = 'asc';
      this.filter = function(params, callback) {
        Loader.load();
        Statement.all(params, function(response) {
          if(response.status == 200) {
            $scope.statements = response.data.statements;
            $scope.totalPages = response.data.meta.totalPages;
            $scope.currentPage = response.data.meta.currentPage;
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
        controller.filter({ text: $scope.searchText }, function() {
          Loader.success('Statements Successfully Searched');
        });
      };
      $scope.changePage = function(page) {
        controller.filter({ text: $scope.searchText, page: page });
      };
      $scope.deleteSelected = function() {
        Loader.load();
        var num = 0,
          count = 0;
        var selectedStatements = [];
        $scope.statements.forEach(function(statement, callback) {
          if(statement.selected) {
            count++;
            selectedStatements.push(statement);
          }
        });
        if(count > 0) {
          selectedStatements.forEach(function(statement) {
            Statement.delete(statement._id, function(response) {
                if(response.status == 200) {
                  num++;
                  var index = $scope.statements.indexOf(statement);
                  $scope.statements.splice(index, 1);
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
            Loader.success(num + ' Statements successfully deleted');
          });
        } else {
          $('#deleteModal').modal('hide');
          Loader.error('Choose at least one position');
        }
      }

      // Load all statements on page load
      this.filter({});
    }
  ]);
