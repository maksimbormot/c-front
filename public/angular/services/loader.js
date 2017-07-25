angular.module('Curve')
  .factory('Loader', function LoaderFactory($http, $rootScope, Notification) {
    var isLoading = false;
    var timeout = null;
    return {
      load: function() {
        isLoading = true;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          isLoading = false;
          $rootScope.$apply();
        }, 60 * 1000);
      },
      complete: function() {
        isLoading = false;
        clearTimeout(timeout);
      },
      success: function(str) {
        this.complete();
        setTimeout(function() {
          Notification.success(str);
        }, 1200);
      },
      error: function(str) {
        this.complete();
        setTimeout(function() {
          Notification.error(str);
        }, 1200);
      },
      getLoader: function() {
        return isLoading;
      }
    };
  });
