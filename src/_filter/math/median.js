/**
 * @ngdoc filter
 * @name median
 * @kind function
 *
 * @description
 * The median value of all values within an array
 */
angular.module('a8m.math.median', ['a8m.math'])
  .filter('median', ['$filter', function ($filter) {
    return function (input) {
      var orderedArray = $filter('orderBy')(input);
      
      if(!isArray(input)){
        return input;
      }
      
      var medianIndex = parseInt(orderedArray.length / 2);
      
      if(orderedArray % 2 != 0){
        medianIndex++;
      }
      
      return orderedArray[medianIndex - 1];
    }
  }]);
