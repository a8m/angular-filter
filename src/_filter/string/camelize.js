/**
 * @ngdoc filter
 * @name camelize
 * @kind function
 *
 * @description
 * Converts a string to camelCase
 */
angular.module('a8m.camelize', [])
  .filter('camelize', function () {
    return function(input, upperFirst) {
      if (!isString(input)) return input;

      return input.toLowerCase()
        .split(/[-_\s]+/g)
        .filter(function(value) {
          return value !== '';
        })
        .map(function(value, index) {
          return index === 0 && !!!upperFirst ? value : value.substring(0, 1).toUpperCase() + value.substring(1);
        })
        .join('');
    }
 });
