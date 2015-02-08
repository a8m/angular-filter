/**
* @ngdoc filter
* @name rtrim
* @kind function
*
* @description
* Right trim. Similar to trimFilter, but only for right side.
*/
angular.module('a8m.rtrim', [])
  .filter('rtrim', function () {
    return function(input, chars) {

      var trim = chars || '\\s';

      return isString(input)
        ? input.replace(new RegExp(trim + '+$'), '')
        : input;
    }
  });
