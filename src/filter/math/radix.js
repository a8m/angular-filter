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

      var RANGE = /^[1-9]$|^[1-2]\d$|^3[0-6]$/;

      if(!isNumber(input)) return input;

      if(!RANGE.test(radix)) {
        throw new Error('radix argument must be between 2 and 36');
      }

      return input.toString(radix).toUpperCase();

    }

  });
