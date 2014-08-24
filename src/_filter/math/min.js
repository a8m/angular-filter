/**
 * @ngdoc filter
 * @name min
 * @kind function
 *
 * @description
 * Math.min
 *
 */

angular.module('a8m.math.min', ['a8m.math'])

  .filter('min', ['$math', function ($math) {
    return function (input) {

      return (isArray(input)) ?
        $math.min.apply($math, input) :
        input;
    }

  }]);
