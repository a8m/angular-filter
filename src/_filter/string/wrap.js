/**
 * @ngdoc filter
 * @name wrap
 * @kind function
 *
 * @description
 * Wrap a string with another string
 */
angular.module('a8m.wrap', [])
  .filter('wrap', function () {
    return function(input, wrap, ends) {
      return isString(input) && isDefined(wrap)
        ? [wrap, input, ends || wrap].join('')
        : input;
    }
  });
