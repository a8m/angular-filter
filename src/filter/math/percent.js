/**
 * @ngdoc filter
 * @name Percent
 * @kind function
 *
 * @description
 * percentage of two numbers
 *
 */

angular.module('a8m.math.percent', ['a8m.math'])

  .filter('percent', ['$math', '$window', function ($math, $window) {

    return function (input, divided) {

      var divider = (isString(input)) ? $window.Number(input) : input;
      divided = divided || 100;

      return (!isNumber(divider) || $window.isNaN(divider)) ?
        input :
        $math.floor((divider / divided) * 100);
    }

  }]);
