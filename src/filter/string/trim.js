/**
 * @ngdoc filter
 * @name trim
 * @kind function
 *
 * @description
 *  Strip whitespace (or other characters) from the beginning and end of a string
 */

angular.module('a8m.trim', [])

  .filter('trim', function () {
    return function(input, chars) {

      var trim = chars || '\\s';

      if(!isString(input)) {
        return input;
      }

      return input.replace(new RegExp('^' + trim + '+|' + trim + '+$', 'g'), '');
    }
  });
