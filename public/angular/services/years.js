angular.module('Curve')
  .factory('Years', function YearsFactory() {
    var date = new Date();
    var nextYear = date.getFullYear() + 1;
    var years = [];
		for(var i = nextYear; i >= 1950; i--) {
			years.push(i);
		}
    return years;
  });
