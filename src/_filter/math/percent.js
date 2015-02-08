/**
 * @ngdoc filter
 * @name Percent
 * @kind function
 *
 * @description
 * percentage between two numbers
 */
angular.module('a8m.math.percent', ['a8m.math'])
  .filter('percent', ['$math', '$window', function ($math, $window) {
    return function (input, divided, round) {

      var divider = (isString(input)) ? $window.Number(input) : input;
      divided = divided || 100;
      round = round || false;

      if (!isNumber(divider) || $window.isNaN(divider)) return input;

      return round
        ? $math.round((divider / divided) * 100)
        : (divider / divided) * 100;
    }
  }]);
