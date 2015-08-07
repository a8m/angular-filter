/**
 * @ngdoc filter
 * @name join
 * @kind function
 *
 * @description
 * join a collection by a provided delimiter (space by default)
 */
angular.module('a8m.join', [])
  .filter('join', function () {
    return function (input, delimiter) {
      if (isUndefined(input) || !isArray(input)) {
        return input;
      }
      if (isUndefined(delimiter)) delimiter = ' ';

      return input.join(delimiter);
    };
  })
;
