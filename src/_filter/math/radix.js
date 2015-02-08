/**
 * @ngdoc filter
 * @name Radix
 * @kind function
 *
 * @description
 * converting decimal numbers to different bases(radix)
 */
angular.module('a8m.math.radix', [])
  .filter('radix', function () {
    return function (input, radix) {
      var RANGE = /^[2-9]$|^[1-2]\d$|^3[0-6]$/;

      if(!isNumber(input) || !RANGE.test(radix)) {
        return input;
      }

      return input.toString(radix).toUpperCase();
    }
  });
