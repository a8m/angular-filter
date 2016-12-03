/**
 * @ngdoc filter
 * @name abs
 * @kind function
 *
 * @description
 * Will return the absolute value of a number
 */
angular.module('a8m.math.abs', [])
  .filter('abs', function () {
    return function (input) {
      return Math.abs(input);
    }
  });
