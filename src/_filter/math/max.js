/**
 * @ngdoc filter
 * @name max
 * @kind function
 *
 * @description
 * Math.max will get an array and return the max value. if an expression
 * is provided, will return max value by expression.
 */
angular.module('a8m.math.max', ['a8m.math'])
  .filter('max', ['$math', '$parse', function ($math, $parse) {
    return function (input, expression) {

      if(!isArray(input)) {
        return input;
      }
      return isUndefined(expression)
        ? $math.max.apply($math, input)
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
      return mappedArray.indexOf($math.max.apply($math, mappedArray));
    }
  }]);