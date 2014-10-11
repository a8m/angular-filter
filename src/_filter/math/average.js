/**
 * @ngdoc filter
 * @name average
 * @kind function
 *
 * @description
 * calculate average number of given array
 * TODO calculate average of an attribute of given object
 */

angular.module('a8m.math.average', ['a8m.math'])

  .filter('average', function () {
    return function (input) {
    	
      if(!isArray(input)) {
    	return input
      }
      var res = 0;
      input.forEach(function(num) {
        res += num;
      });
      return res/input.length
    }
  });

 
 
