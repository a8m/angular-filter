/**
 * @ngdoc filter
 * @name match
 * @kind function
 *
 * @description
 * Return the matched pattern in a string.
 */
angular.module('a8m.match', [])
  .filter('match', function () {
    return function (input, pattern, flag) {

      var reg = new RegExp(pattern, flag);

      return isString(input)
        ? input.match(reg)
        : null;
    }
  });
