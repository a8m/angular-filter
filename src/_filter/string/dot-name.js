/**
 * @ngdoc filter
 * @name dotName
 * @kind function
 *
 * @description
 * replace firstname and all middle names with a dot notation.
 */
angular.module('a8m.dot-name', [])

  .filter('dotName', function () {
    return function (input) {

      if(!isString(input)) {
        return input;
      }

      var parts = input.split(' '),
          len = parts.length;

      if (parts.length < 2) {
        return input;
      }

      return parts.map(function(part, idx){
        if (idx === len - 1) {
          return part;
        }

        return part.charAt(0) + '.';
      }).join(' ');
    }
  });
