/**
 * @ngdoc filter
 * @name sum
 * @kind function
 *
 * @description
 * Sum up all values within an array
 */
angular.module('a8m.math.sum', [])
  .filter('sum', function () {
    return function (input, initial) {
      return !isArray(input)
        ? input
        : input.reduce(function(prev, curr) {
          return prev + curr;
        }, initial || 0);
    }
  });
