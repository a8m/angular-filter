/**
 * @ngdoc filter
 * @name range
 * @kind function
 *
 * @description
 * rangeFilter provides some support for a for loop using numbers
 */
angular.module('a8m.range', [])
  .filter('range', function () {
    return function (input, total, start, increment, cb) {
      start = start || 0;
      increment = increment || 1;
      for (var i = 0; i < parseInt(total); i++) {
        var j = start + i * increment;
        input.push(isFunction(cb) ? cb(j) : j);
      }
      return input;
    };
  });