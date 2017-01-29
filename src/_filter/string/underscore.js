/**
 * @ngdoc filter
 * @name underscore
 * @kind function
 *
 * @description
 * Converts a string to underscore
 */
angular.module('a8m.underscore', [])
  .filter('underscore', function () {
    return function(input) {
      if (!isString(input)) return input;

      return input.replace(/\W/g, '').replace(
        /[A-Z]/g, function(value, index) { return index === 0 ? value.toLowerCase() : '_' + value.toLowerCase() });
    }
  });
