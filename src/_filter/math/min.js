/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min will get an array and return the min value. if an expression
 * is provided, will return min value by expression.
 */
angular.module('a8m.math.min', [])
  .filter('min', ['$parse', function ($parse) {
    return function (input, expression) {

      if(!isArray(input)) {
        return input;
      }
      return isUndefined(expression)
        ? Math.min.apply(Math, input)
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
      return mappedArray.indexOf(Math.min.apply(Math, mappedArray));
    }
  }]);