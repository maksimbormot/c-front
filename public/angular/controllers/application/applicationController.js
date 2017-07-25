angular.module('Curve')
  .controller('applicationController', ['$scope', '$rootScope', '$cookies', 'Session', 'Auth', 'Loader',
    function($scope, $rootScope, $cookies, Session, Auth, Loader) {
      var controller = this;
      $scope.isLoggedIn = Session.isLoggedIn;
      $scope.internalUser = false;

      Loader.load();
      Auth.test($cookies.get('curveToken'), function(session) {
        console.log(session);
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

    }
  ]);
