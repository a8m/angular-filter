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

      if(!isString(input)) {
        return input;
      }

      return input.replace(new RegExp(trim + '+$'), '');
    }
  });
