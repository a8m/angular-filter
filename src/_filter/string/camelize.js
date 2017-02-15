/**
 * @ngdoc filter
 * @name camelize
 * @kind function
 *
 * @description
 * Converts a string to camelCase
 */
angular.module('a8m.camelize', [])
  .filter({
    camelize: ['$parse', camelizeFilter],
    camelCase: ['$parse', camelizeFilter]
  });

function camelizeFilter($parse) {
  return function(input) {
    if (!isString(input)) return input;

    return input.toLowerCase()
      .split(/[-_\s]+/g)
      .filter(function(value) {
        return value !== '';
      })
      .map(function(value, index) {
        return index === 0 ? value : value.slice(0, 1).toUpperCase() + value.slice(1);
      })
      .join('');
  }
}
