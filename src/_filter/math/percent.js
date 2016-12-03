/**
 * @ngdoc filter
 * @name Percent
 * @kind function
 *
 * @description
 * percentage between two numbers
 */
angular.module('a8m.math.percent', [])
  .filter('percent', function () {
    return function (input, divided, round) {

      var divider = isString(input) ? Number(input) : input;
      divided = divided || 100;
      round = round || false;

      if (!isNumber(divider) || isNaN(divider)) return input;

      return round
        ? Math.round((divider / divided) * 100)
        : (divider / divided) * 100;
    }
  });
