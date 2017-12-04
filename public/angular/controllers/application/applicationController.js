angular.module('Curve')
  .controller('applicationController', ['$scope', '$route', '$window', '$rootScope', '$cookies', 'Session', 'Auth', 'Loader', 'User', 'jwtHelper',
    function($scope, $route, $window, $rootScope, $cookies, Session, Auth, Loader, User, jwtHelper) {
      var controller = this;
      $scope.isLoggedIn = Session.isLoggedIn;
      $scope.internalUser = false;
      $scope.currentClient = "";
      $scope.userRole = "";

      Loader.load();

      Auth.test($cookies.get('curveToken'), function(session) {
        Loader.complete();
        if(session.userType == "internal") {
          $scope.internalUser = true;
        }
      });

      $(".sidebar-menu ul li.sidebar-menu-item a.go-to").click(function(e) {
        //e.preventDefault();
        $(".sidebar-menu-item").removeClass('active');
        $(".sidebar-menu ul li.sidebar-menu-item span.icon-thumbnail").removeClass('bg-success');
        $(".sidebar-menu ul li.sidebar-menu-item ul.sub-menu li.sub-menu-item span.icon-thumbnail").removeClass('white');
        $(this).parents(".sidebar-menu-item").addClass('active');
        $(this).parents(".sidebar-menu-item").find("span.icon-thumbnail:first").addClass('bg-success');
        $(this).parents(".sub-menu-item").find("span.icon-thumbnail").addClass('white');
      })

      $scope.openOverlay = function() {
        $rootScope.isOpenOverlay = true;
      }

      $scope.logout = function() {
        Auth.logout();
      }

      $scope.getUsers = function(){
          if( Session.userType === "internal" || Session.userType === "parent"){
            $scope.currentClient = $cookies.get('currentClient');
            $scope.userRole = Session.userType;
            $scope.id = Session.id;

            User.all({"clientsOnly": true}, function(response) {
    					if(response.status == 200) {
    						$scope.clients = response.data.clients;
    						Loader.complete();
    					} else {
    						Loader.error('Error loading user, please try again or contact support');
    					}
    				});
          }
      }

      $scope.setClientForCurrentUser = function(client) {
        debugger
        $rootScope.currentClient = client.name;
        $cookies.put('currentClient', client.name);
        debugger
        User.set_user($scope.id, {roleId: client._id}, function(response){
          Session.token =  response.data.token;
          $cookies.put('curveToken', Session.token);
          var tokenPayload = jwtHelper.decodeToken(response.data.token);
          Session.roleId = tokenPayload.roleId;
          $route.reload();
          $window.location.href = "#/users";
        })
      }

  }
]);
