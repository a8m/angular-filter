/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min will get an array and return the min value. if an expression
 * is provided, will return min value by expression.
 */
angular.module('a8m.math.min', ['a8m.math'])
  .filter('min', ['$math', '$parse', function ($math, $parse) {
    return function (input, expression) {

      if(!isArray(input)) {
        return input;
      }
      return isUndefined(expression)
        ? $math.min.apply($math, input)
        : input[indexByMin(input, expression)];
    };

    /**
     * @private
     * @param array
     * @param exp
     * @returns {number|*|Number}
     */
    function indexByMin(array, exp) {
      var mappedArray = array.map(function(elm){
        return $parse(exp)(elm);
      });
      return mappedArray.indexOf($math.min.apply($math, mappedArray));
    }
  }]);