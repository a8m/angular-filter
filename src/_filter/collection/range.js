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
    return function (input, total) {
      for (var i = 0; i < parseInt(total); i++) {
        input.push(i);
      }
      return input;
	  };
  });