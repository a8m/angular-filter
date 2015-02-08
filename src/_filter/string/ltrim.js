/**
 * @ngdoc filter
 * @name ltrim
 * @kind function
 *
 * @description
 * Left trim. Similar to trimFilter, but only for left side.
 */
angular.module('a8m.ltrim', [])
  .filter('ltrim', function () {
    return function(input, chars) {

      var trim = chars || '\\s';

      return isString(input)
        ? input.replace(new RegExp('^' + trim + '+'), '')
        : input;
    }
  });
