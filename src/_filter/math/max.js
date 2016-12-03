/**
 * @ngdoc filter
 * @name max
 * @kind function
 *
 * @description
 * Math.max will get an array and return the max value. if an expression
 * is provided, will return max value by expression.
 */
angular.module('a8m.math.max', [])
  .filter('max', ['$parse', function ($parse) {
    return function (input, expression) {

      if(!isArray(input)) {
        return input;
      }
      return isUndefined(expression)
        ? Math.max.apply(Math, input)
        : input[indexByMax(input, expression)];
    };

    /**
     * @private
     * @param array
     * @param exp
     * @returns {number|*|Number}
     */
    function indexByMax(array, exp) {
      var mappedArray = array.map(function(elm){
        return $parse(exp)(elm);
      });
      return mappedArray.indexOf(Math.max.apply(Math, mappedArray));
    }
  }]);